import { createContext, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSocketContext } from "./SocketContext";
import { useAuthContext } from "./AuthContext";

const CallContext = createContext();

const rtcConfig = {
	iceServers: [
		{ urls: "stun:stun.l.google.com:19302" },
		{ urls: "stun:stun1.l.google.com:19302" },
	],
};

export const useCallContext = () => useContext(CallContext);

export const CallContextProvider = ({ children }) => {
	const { socket } = useSocketContext();
	const { authUser } = useAuthContext();
	const [callState, setCallState] = useState({
		status: "idle",
		callType: null,
		contact: null,
		isIncoming: false,
	});
	const [incomingCall, setIncomingCall] = useState(null);
	const [localStream, setLocalStream] = useState(null);
	const [remoteStream, setRemoteStream] = useState(null);

	const peerConnectionRef = useRef(null);
	const pendingOfferRef = useRef(null);
	const remoteCandidatesRef = useRef([]);
	const currentContactRef = useRef(null);
	const localStreamRef = useRef(null);

	const stopStream = (stream) => {
		stream?.getTracks().forEach((track) => track.stop());
	};

	const resetCallState = () => {
		peerConnectionRef.current?.close();
		peerConnectionRef.current = null;
		stopStream(localStreamRef.current);
		localStreamRef.current = null;
		setLocalStream(null);
		setRemoteStream(null);
		pendingOfferRef.current = null;
		remoteCandidatesRef.current = [];
		currentContactRef.current = null;
		setCallState({ status: "idle", callType: null, contact: null, isIncoming: false });
	};

	const flushPendingCandidates = async () => {
		const peerConnection = peerConnectionRef.current;
		if (!peerConnection?.remoteDescription) return;

		while (remoteCandidatesRef.current.length > 0) {
			const candidate = remoteCandidatesRef.current.shift();
			await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
		}
	};

	const createPeerConnection = (contact, stream) => {
		const peerConnection = new RTCPeerConnection(rtcConfig);

		peerConnection.onicecandidate = (event) => {
			if (!event.candidate || !socket || !contact?._id) return;
			socket.emit("call:ice-candidate", {
				receiverId: contact._id,
				candidate: event.candidate,
			});
		};

		peerConnection.ontrack = (event) => {
			const [streamFromTrack] = event.streams;
			if (streamFromTrack) {
				setRemoteStream(streamFromTrack);
			}
		};

		peerConnection.onconnectionstatechange = () => {
			if (peerConnection.connectionState === "connected") {
				setCallState((current) => ({ ...current, status: "connected" }));
			}

			if (["failed", "closed", "disconnected"].includes(peerConnection.connectionState)) {
				resetCallState();
			}
		};

		stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
		peerConnectionRef.current = peerConnection;

		return peerConnection;
	};

	const getMediaStream = async (callType) => {
		try {
			if (!navigator.mediaDevices?.getUserMedia) {
				if (!window.isSecureContext) {
					toast.error("Calling needs HTTPS or localhost on this device.");
					throw new Error("Insecure context");
				}

				toast.error("This browser does not support camera/mic access here.");
				throw new Error("Media devices unavailable");
			}

			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: callType === "video",
			});
			localStreamRef.current = stream;
			setLocalStream(stream);
			return stream;
		} catch (error) {
			if (error.name === "NotAllowedError") {
				toast.error("Allow microphone/camera access to continue the call.");
			} else if (error.name === "NotFoundError") {
				toast.error("No microphone/camera was found on this device.");
			} else if (error.name === "NotReadableError") {
				toast.error("Camera/microphone is busy in another app.");
			} else if (!["Insecure context", "Media devices unavailable"].includes(error.message)) {
				toast.error("Unable to start the call on this device.");
			}

			throw error;
		}
	};

	const startCall = async (contact, callType) => {
		if (!socket || !authUser || !contact?._id) return;
		if (callState.status !== "idle") {
			toast.error("Another call is already active.");
			return;
		}

		try {
			const stream = await getMediaStream(callType);
			const peerConnection = createPeerConnection(contact, stream);
			currentContactRef.current = contact;
			setCallState({ status: "calling", callType, contact, isIncoming: false });

			const offer = await peerConnection.createOffer();
			await peerConnection.setLocalDescription(offer);

			socket.emit("call:offer", {
				receiverId: contact._id,
				offer,
				callType,
				caller: {
					_id: authUser._id,
					fullName: authUser.fullName,
					username: authUser.username,
					profilePic: authUser.profilePic,
				},
			});
		} catch {
			resetCallState();
		}
	};

	const answerCall = async () => {
		if (!incomingCall || !socket) return;

		try {
			const stream = await getMediaStream(incomingCall.callType);
			const peerConnection = createPeerConnection(incomingCall.caller, stream);
			currentContactRef.current = incomingCall.caller;
			setCallState({
				status: "connecting",
				callType: incomingCall.callType,
				contact: incomingCall.caller,
				isIncoming: true,
			});

			await peerConnection.setRemoteDescription(new RTCSessionDescription(incomingCall.offer));
			await flushPendingCandidates();

			const answer = await peerConnection.createAnswer();
			await peerConnection.setLocalDescription(answer);

			socket.emit("call:answer", {
				receiverId: incomingCall.caller._id,
				answer,
			});

			setIncomingCall(null);
		} catch {
			rejectCall();
		}
	};

	const rejectCall = () => {
		if (socket && incomingCall?.caller?._id) {
			socket.emit("call:reject", { receiverId: incomingCall.caller._id });
		}
		setIncomingCall(null);
		resetCallState();
	};

	const endCall = () => {
		if (socket && currentContactRef.current?._id) {
			socket.emit("call:end", { receiverId: currentContactRef.current._id });
		}
		setIncomingCall(null);
		resetCallState();
	};

	useEffect(() => {
		if (!socket) return;

		const handleOffer = ({ offer, callType, caller }) => {
			if (callState.status !== "idle" || incomingCall) {
				socket.emit("call:reject", { receiverId: caller._id });
				return;
			}

			pendingOfferRef.current = offer;
			setIncomingCall({ offer, callType, caller });
			setCallState({ status: "ringing", callType, contact: caller, isIncoming: true });
		};

		const handleAnswer = async ({ answer }) => {
			const peerConnection = peerConnectionRef.current;
			if (!peerConnection) return;

			await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
			await flushPendingCandidates();
			setCallState((current) => ({ ...current, status: "connected" }));
		};

		const handleIceCandidate = async ({ candidate }) => {
			const peerConnection = peerConnectionRef.current;
			if (!peerConnection?.remoteDescription) {
				remoteCandidatesRef.current.push(candidate);
				return;
			}

			await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
		};

		const handleReject = () => {
			toast.error("Call declined.");
			resetCallState();
			setIncomingCall(null);
		};

		const handleEnd = () => {
			toast("Call ended.");
			setIncomingCall(null);
			resetCallState();
		};

		socket.on("call:offer", handleOffer);
		socket.on("call:answer", handleAnswer);
		socket.on("call:ice-candidate", handleIceCandidate);
		socket.on("call:reject", handleReject);
		socket.on("call:end", handleEnd);

		return () => {
			socket.off("call:offer", handleOffer);
			socket.off("call:answer", handleAnswer);
			socket.off("call:ice-candidate", handleIceCandidate);
			socket.off("call:reject", handleReject);
			socket.off("call:end", handleEnd);
		};
	}, [socket, callState.status, incomingCall]);

	useEffect(() => () => resetCallState(), []);

	return (
		<CallContext.Provider
			value={{
				callState,
				incomingCall,
				localStream,
				remoteStream,
				startCall,
				answerCall,
				rejectCall,
				endCall,
			}}
		>
			{children}
		</CallContext.Provider>
	);
};
