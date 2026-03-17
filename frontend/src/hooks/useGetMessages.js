import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		if (!selectedConversation?._id) {
			setMessages([]);
			return;
		}

		const abortController = new AbortController();

		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`, {
					signal: abortController.signal,
				});
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				if (error.name === "AbortError") return;
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getMessages();

		return () => abortController.abort();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;
