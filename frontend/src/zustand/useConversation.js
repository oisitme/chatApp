import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) =>
		set((state) => ({
			selectedConversation,
			unreadCounts: selectedConversation
				? { ...state.unreadCounts, [selectedConversation._id]: 0 }
				: state.unreadCounts,
		})),
	conversations: [],
	setConversations: (conversations) => set({ conversations }),
	messages: [],
	setMessages: (messages) =>
		set((state) => ({
			messages: typeof messages === "function" ? messages(state.messages) : messages,
		})),
	addMessage: (message) =>
		set((state) => {
			if (state.messages.some((currentMessage) => currentMessage._id === message._id)) {
				return state;
			}

			return { messages: [...state.messages, message] };
		}),
	replaceMessage: (messageId, message) =>
		set((state) => ({
			messages: state.messages.map((currentMessage) =>
				currentMessage._id === messageId ? { ...currentMessage, ...message } : currentMessage
			),
		})),
	removeMessage: (messageId) =>
		set((state) => ({
			messages: state.messages.filter((currentMessage) => currentMessage._id !== messageId),
		})),
	unreadCounts: {},
	incrementUnread: (conversationId) =>
		set((state) => ({
			unreadCounts: {
				...state.unreadCounts,
				[conversationId]: (state.unreadCounts[conversationId] || 0) + 1,
			},
		})),
	clearUnread: (conversationId) =>
		set((state) => ({
			unreadCounts: {
				...state.unreadCounts,
				[conversationId]: 0,
			},
		})),
	typingUsers: {},
	setTypingStatus: (conversationId, isTyping) =>
		set((state) => ({
			typingUsers: {
				...state.typingUsers,
				[conversationId]: isTyping,
			},
		})),
}));

export default useConversation;
