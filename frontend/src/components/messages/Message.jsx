import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { HiCheck, HiCheckCircle } from "react-icons/hi";
import UserAvatar from "../common/UserAvatar";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id || message.senderId === "me";
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe
		? "border border-teal-300/20 bg-gradient-to-br from-teal-400 to-sky-500 text-slate-950"
		: "border border-white/10 bg-slate-900/80 text-slate-100";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName} mb-2`}>
			<div className='chat-image avatar self-end'>
				<UserAvatar
					src={profilePic}
					name={fromMe ? authUser.fullName : selectedConversation?.fullName}
					alt='Chat avatar'
					className='h-9 w-9 rounded-2xl ring-1 ring-white/10'
					textClassName='text-xs'
				/>
			</div>
			<div className={`chat-bubble ${bubbleBgColor} ${shakeClass} max-w-[82%] rounded-[1.5rem] px-4 py-3 shadow-lg`}>
				{message.messageType === "gif" || message.messageType === "image" ? (
					<div className='overflow-hidden rounded-2xl bg-slate-950/20'>
						<img
							src={message.message}
							alt={message.messageType}
							className='max-h-80 w-full object-cover'
							loading='lazy'
						/>
					</div>
				) : (
					<p className='whitespace-pre-wrap break-words text-sm leading-6'>{message.message}</p>
				)}
				<div
					className={`mt-2 flex items-center justify-end gap-1 text-[11px] ${
						fromMe ? "text-slate-800/75" : "text-slate-400"
					}`}
				>
					<span>{formattedTime}</span>
					{fromMe ? (
						message.pending ? <HiCheck className='h-3.5 w-3.5' /> : <HiCheckCircle className='h-3.5 w-3.5' />
					) : null}
				</div>
			</div>
		</div>
	);
};
export default Message;
