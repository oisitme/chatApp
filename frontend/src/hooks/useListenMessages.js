import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { selectedConversation, addMessage, incrementUnread, setTypingStatus } = useConversation();

	useEffect(() => {
		if (!socket) return;

		const handleNewMessage = (newMessage) => {
			if (selectedConversation?._id === newMessage.senderId) {
				newMessage.shouldShake = true;
				addMessage(newMessage);
				return;
			}

			incrementUnread(newMessage.senderId);
		};

		const handleTyping = ({ senderId }) => {
			setTypingStatus(senderId, true);
		};

		const handleStopTyping = ({ senderId }) => {
			setTypingStatus(senderId, false);
		};

		socket.on("newMessage", handleNewMessage);
		socket.on("typing", handleTyping);
		socket.on("stopTyping", handleStopTyping);

		return () => {
			socket.off("newMessage", handleNewMessage);
			socket.off("typing", handleTyping);
			socket.off("stopTyping", handleStopTyping);
		};
	}, [socket, selectedConversation?._id, addMessage, incrementUnread, setTypingStatus]);
};
export default useListenMessages;
