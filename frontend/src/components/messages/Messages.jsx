import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
		}, 80);

		return () => clearTimeout(timeoutId);
	}, [messages]);

	return (
		<div className='chat-scroll flex-1 overflow-auto px-4 py-4 md:px-6'>
			<div className='mx-auto flex max-w-4xl flex-col gap-1'>
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<div className='rounded-3xl border border-dashed border-white/10 bg-white/[0.04] px-4 py-10 text-center text-sm text-slate-400'>
					Send a message to start the conversation.
				</div>
			)}
			</div>
		</div>
	);
};
export default Messages;

// STARTER CODE SNIPPET
// import Message from "./Message";

// const Messages = () => {
// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 		</div>
// 	);
// };
// export default Messages;
