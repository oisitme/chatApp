import { useEffect, useRef, useState } from "react";
import { HiOutlinePaperAirplane, HiOutlinePhoto } from "react-icons/hi2";
import useSendMessage from "../../hooks/useSendMessage";
import { useSocketContext } from "../../context/SocketContext";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();
	const { socket } = useSocketContext();
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const typingTimeoutRef = useRef(null);
	const fileInputRef = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message.trim()) return;
		await sendMessage(message.trim());
		socket?.emit("stopTyping", { receiverId: selectedConversation._id, senderId: authUser._id });
		setMessage("");
	};

	const handleFileChange = async (event) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const isGif = file.type === "image/gif";
		const isImage = file.type.startsWith("image/");

		if (!isImage) {
			event.target.value = "";
			return;
		}

		const reader = new FileReader();
		reader.onload = async () => {
			const fileUrl = typeof reader.result === "string" ? reader.result : "";
			if (!fileUrl) return;

			await sendMessage(fileUrl, isGif ? "gif" : "image");
			socket?.emit("stopTyping", { receiverId: selectedConversation._id, senderId: authUser._id });
		};
		reader.readAsDataURL(file);
		event.target.value = "";
	};

	useEffect(() => {
		if (!socket || !selectedConversation?._id || !authUser?._id) return;

		if (!message.trim()) {
			socket.emit("stopTyping", { receiverId: selectedConversation._id, senderId: authUser._id });
			return;
		}

		socket.emit("typing", { receiverId: selectedConversation._id, senderId: authUser._id });

		clearTimeout(typingTimeoutRef.current);
		typingTimeoutRef.current = setTimeout(() => {
			socket.emit("stopTyping", { receiverId: selectedConversation._id, senderId: authUser._id });
		}, 900);

		return () => clearTimeout(typingTimeoutRef.current);
	}, [message, socket, selectedConversation?._id, authUser?._id]);

	return (
		<form className='border-t border-white/10 bg-slate-950/65 px-4 py-4 md:px-6' onSubmit={handleSubmit}>
			<div className='mx-auto flex max-w-4xl items-center gap-3'>
					<button
						type='button'
						onClick={() => fileInputRef.current?.click()}
						className='flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-slate-200 transition hover:bg-white/[0.08]'
						aria-label='Upload image or GIF'
						title='Upload image or GIF'
					>
						<HiOutlinePhoto className='h-5 w-5' />
					</button>
					<input
						ref={fileInputRef}
						type='file'
						accept='image/*,.gif'
						className='hidden'
						onChange={handleFileChange}
					/>
				<input
					type='text'
					className='h-[3.25rem] w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400/60 focus:bg-slate-900/80'
					placeholder='Write a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button
					type='submit'
					className='flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-sky-500 text-slate-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70'
					disabled={loading || !message.trim()}
					aria-label='Send message'
				>
					{loading ? <div className='loading loading-spinner' /> : <HiOutlinePaperAirplane className='h-5 w-5' />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;

// STARTER CODE SNIPPET
// import { BsSend } from "react-icons/bs";

// const MessageInput = () => {
// 	return (
// 		<form className='px-4 my-3'>
// 			<div className='w-full'>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
// 					placeholder='Send a message'
// 				/>
// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// 					<BsSend />
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;
