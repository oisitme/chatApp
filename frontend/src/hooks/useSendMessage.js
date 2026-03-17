import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { apiFetch } from "../utils/api";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { addMessage, replaceMessage, removeMessage, selectedConversation } = useConversation();

	const sendMessage = async (message, messageType = "text") => {
		setLoading(true);
		const optimisticMessageId = `temp-${Date.now()}`;
		const optimisticMessage = {
			_id: optimisticMessageId,
			message,
			messageType,
			senderId: "me",
			receiverId: selectedConversation._id,
			createdAt: new Date().toISOString(),
			pending: true,
		};

		addMessage(optimisticMessage);

		try {
			const res = await apiFetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message, messageType }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			replaceMessage(optimisticMessageId, data);
		} catch (error) {
			removeMessage(optimisticMessageId);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;
