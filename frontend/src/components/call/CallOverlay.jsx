import { useEffect, useRef } from "react";
import { HiOutlinePhone, HiOutlinePhoneXMark, HiOutlineVideoCamera } from "react-icons/hi2";
import { useCallContext } from "../../context/CallContext";
import UserAvatar from "../common/UserAvatar";

const CallOverlay = () => {
	const { callState, incomingCall, localStream, remoteStream, answerCall, rejectCall, endCall } = useCallContext();
	const localVideoRef = useRef(null);
	const remoteVideoRef = useRef(null);

	useEffect(() => {
		if (localVideoRef.current) {
			localVideoRef.current.srcObject = localStream || null;
		}
	}, [localStream]);

	useEffect(() => {
		if (remoteVideoRef.current) {
			remoteVideoRef.current.srcObject = remoteStream || null;
		}
	}, [remoteStream]);

	if (callState.status === "idle") return null;

	const activeContact = incomingCall?.caller || callState.contact;
	const isVideo = callState.callType === "video";
	const isIncoming = callState.status === "ringing" && incomingCall;

	return (
		<div className='fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/88 p-4 backdrop-blur-xl'>
			<div className='relative flex h-full max-h-[52rem] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-[0_25px_90px_rgba(2,6,23,0.8)]'>
				{isVideo ? (
					<>
						<div className='absolute inset-0 bg-slate-900'>
							{remoteStream ? (
								<video ref={remoteVideoRef} autoPlay playsInline className='h-full w-full object-cover' />
							) : (
								<div className='flex h-full items-center justify-center'>
									<UserAvatar
										src={activeContact?.profilePic}
										name={activeContact?.fullName}
										className='h-40 w-40 rounded-[2rem]'
										textClassName='text-4xl'
									/>
								</div>
							)}
						</div>
						<div className='absolute bottom-6 right-6 h-36 w-28 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950 shadow-xl'>
							{localStream ? (
								<video ref={localVideoRef} autoPlay muted playsInline className='h-full w-full object-cover' />
							) : null}
						</div>
					</>
				) : (
					<div className='flex w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.15),_transparent_22%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)] px-6 text-center'>
						<UserAvatar
							src={activeContact?.profilePic}
							name={activeContact?.fullName}
							className='h-32 w-32 rounded-[2rem]'
							textClassName='text-3xl'
						/>
					</div>
				)}

				<div className='absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-slate-950/80 to-transparent p-6'>
					<div>
						<p className='text-2xl font-semibold text-slate-100'>{activeContact?.fullName || "Call"}</p>
						<p className='mt-1 text-sm text-slate-300'>
							{isIncoming
								? `Incoming ${callState.callType} call`
								: callState.status === "calling"
									? `Calling...`
									: callState.status === "connecting"
										? "Connecting..."
										: `Connected ${callState.callType} call`}
						</p>
					</div>
					<div className='flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-slate-100'>
						{isVideo ? <HiOutlineVideoCamera className='h-6 w-6' /> : <HiOutlinePhone className='h-6 w-6' />}
					</div>
				</div>

				<div className='absolute inset-x-0 bottom-0 flex items-center justify-center gap-4 p-6'>
					{isIncoming ? (
						<>
							<button
								type='button'
								onClick={rejectCall}
								className='flex items-center gap-2 rounded-2xl bg-rose-500 px-5 py-3 font-medium text-white transition hover:bg-rose-400'
							>
								<HiOutlinePhoneXMark className='h-5 w-5' />
								Decline
							</button>
							<button
								type='button'
								onClick={answerCall}
								className='flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-emerald-400'
							>
								<HiOutlinePhone className='h-5 w-5' />
								Answer
							</button>
						</>
					) : (
						<button
							type='button'
							onClick={endCall}
							className='flex items-center gap-2 rounded-2xl bg-rose-500 px-5 py-3 font-medium text-white transition hover:bg-rose-400'
						>
							<HiOutlinePhoneXMark className='h-5 w-5' />
							End call
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default CallOverlay;
