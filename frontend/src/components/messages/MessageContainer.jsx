import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { HiOutlineArrowLeft, HiOutlinePhone, HiOutlineVideoCamera } from "react-icons/hi2";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import UserAvatar from "../common/UserAvatar";
import { useCallContext } from "../../context/CallContext";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation, typingUsers } = useConversation();
	const { onlineUsers } = useSocketContext();
	const { startCall, callState } = useCallContext();
	const isTyping = selectedConversation ? typingUsers[selectedConversation._id] : false;
	const isCallBusy = callState.status !== "idle";

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='relative z-10 flex h-full min-w-0 flex-col bg-slate-950/[0.35]'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					<div className='flex items-center justify-between border-b border-white/10 bg-slate-950/[0.65] px-4 py-4'>
						<div className='flex min-w-0 items-center gap-3'>
							<button
								type='button'
								onClick={() => setSelectedConversation(null)}
								className='flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/[0.08] md:hidden'
								aria-label='Back to chats'
							>
								<HiOutlineArrowLeft className='h-5 w-5' />
							</button>
							<UserAvatar
								src={selectedConversation.profilePic}
								name={selectedConversation.fullName}
								alt={selectedConversation.fullName}
								className='h-11 w-11 rounded-2xl ring-1 ring-white/10'
								textClassName='text-sm'
							/>
							<div className='min-w-0'>
								<p className='truncate text-base font-semibold text-slate-100'>
									{selectedConversation.fullName}
								</p>
								<p
									className={`text-sm ${
										isTyping
											? "text-teal-300"
											: onlineUsers.includes(selectedConversation._id)
												? "text-emerald-300"
												: "text-slate-400"
									}`}
								>
									{isTyping
										? "Typing..."
										: onlineUsers.includes(selectedConversation._id)
											? "Online now"
											: "Available offline"}
								</p>
							</div>
						</div>
						<div className='flex items-center gap-2'>
							<button
								type='button'
								onClick={() => startCall(selectedConversation, "audio")}
								className='flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40'
								aria-label='Voice call'
								disabled={!onlineUsers.includes(selectedConversation._id) || isCallBusy}
							>
								<HiOutlinePhone className='h-5 w-5' />
							</button>
							<button
								type='button'
								onClick={() => startCall(selectedConversation, "video")}
								className='flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-200 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40'
								aria-label='Video call'
								disabled={!onlineUsers.includes(selectedConversation._id) || isCallBusy}
							>
								<HiOutlineVideoCamera className='h-5 w-5' />
							</button>
						</div>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex h-full items-center justify-center px-6'>
			<div className='max-w-lg rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.25)]'>
				<div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-400/[0.15] text-teal-100'>
					<TiMessages className='text-4xl' />
				</div>
				<p className='text-2xl font-semibold text-slate-100'>Welcome back, {authUser.fullName}</p>
				<p className='mt-3 text-sm leading-6 text-slate-400'>
					Pick a conversation from the left and start chatting with a cleaner, faster messaging experience.
				</p>
				<div className='mt-6 grid gap-3 text-left text-sm text-slate-300 md:grid-cols-2'>
					<div className='rounded-2xl border border-white/10 bg-slate-900/60 p-4'>
						<p className='font-semibold text-slate-100'>Real-time delivery</p>
						<p className='mt-1 text-slate-400'>Messages appear instantly and feel responsive during rapid chats.</p>
					</div>
					<div className='rounded-2xl border border-white/10 bg-slate-900/60 p-4'>
						<p className='font-semibold text-slate-100'>Focused design</p>
						<p className='mt-1 text-slate-400'>A cleaner contact list, clearer message ownership, and better spacing.</p>
					</div>
				</div>
			</div>
		</div>
	);
};

// STARTER CODE SNIPPET
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";

// const MessageContainer = () => {
// 	return (
// 		<div className='md:min-w-[450px] flex flex-col'>
// 			<>
// 				{/* Header */}
// 				<div className='bg-slate-500 px-4 py-2 mb-2'>
// 					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John doe</span>
// 				</div>

// 				<Messages />
// 				<MessageInput />
// 			</>
// 		</div>
// 	);
// };
// export default MessageContainer;
