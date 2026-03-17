import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import UserAvatar from "../common/UserAvatar";

const Conversation = ({ conversation, lastIdx }) => {
	const { selectedConversation, setSelectedConversation, unreadCounts, typingUsers } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);
	const unreadCount = unreadCounts[conversation._id] || 0;
	const isTyping = typingUsers[conversation._id];

	return (
		<>
			<div
				className={`group flex cursor-pointer items-center gap-3 rounded-3xl border px-3 py-3 transition
				${isSelected ? "border-teal-400/30 bg-teal-400/[0.14] shadow-[0_12px_30px_rgba(45,212,191,0.08)]" : "border-transparent bg-white/[0.03] hover:border-white/10 hover:bg-white/[0.06]"}
			`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className='relative'>
					<UserAvatar
						src={conversation.profilePic}
						name={conversation.fullName}
						alt='user avatar'
						className='h-12 w-12 rounded-2xl ring-1 ring-white/10'
						textClassName='text-sm'
					/>
					<span
						className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-slate-950 ${
							isOnline ? "bg-emerald-400" : "bg-slate-600"
						}`}
					/>
				</div>

				<div className='min-w-0 flex-1'>
					<div className='flex items-center justify-between gap-3'>
						<p className='truncate font-semibold text-slate-100'>{conversation.fullName}</p>
						<div className='flex items-center gap-2'>
							{unreadCount > 0 ? (
								<span className='flex min-w-6 items-center justify-center rounded-full bg-teal-400 px-2 py-0.5 text-[11px] font-semibold text-slate-950'>
									{unreadCount}
								</span>
							) : null}
							<span className={`text-xs ${isOnline ? "text-emerald-300" : "text-slate-500"}`}>
								{isOnline ? "Online" : "Offline"}
							</span>
						</div>
					</div>
					<p className={`truncate text-sm ${isTyping ? "text-teal-300" : "text-slate-400"}`}>
						{isTyping
							? "Typing..."
							: `${conversation.username} • ${isOnline ? "Ready to chat" : "Send a message anytime"}`}
					</p>
				</div>
			</div>

			{!lastIdx && <div className='my-2 h-px bg-white/[0.06]' />}
		</>
	);
};
export default Conversation;

// STARTER CODE SNIPPET
// const Conversation = () => {
// 	return (
// 		<>
// 			<div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
// 				<div className='avatar online'>
// 					<div className='w-12 rounded-full'>
// 						<img
// 							src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
// 							alt='user avatar'
// 						/>
// 					</div>
// 				</div>

// 				<div className='flex flex-col flex-1'>
// 					<div className='flex gap-3 justify-between'>
// 						<p className='font-bold text-gray-200'>John Doe</p>
// 						<span className='text-xl'>🎃</span>
// 					</div>
// 				</div>
// 			</div>

// 			<div className='divider my-0 py-0 h-1' />
// 		</>
// 	);
// };
// export default Conversation;
