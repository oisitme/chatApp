import { useState } from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import useGetConversations from "../../hooks/useGetConversations";
import { useAuthContext } from "../../context/AuthContext";
import UserAvatar from "../common/UserAvatar";

const Sidebar = () => {
	const [search, setSearch] = useState("");
	const { loading, conversations } = useGetConversations();
	const { authUser } = useAuthContext();

	const filteredConversations = conversations.filter((conversation) => {
		const searchValue = search.trim().toLowerCase();
		if (!searchValue) return true;

		return (
			conversation.fullName.toLowerCase().includes(searchValue) ||
			conversation.username.toLowerCase().includes(searchValue)
		);
	});

	return (
		<div className='relative z-10 flex h-full flex-col border-r border-white/10 bg-slate-950/[0.55] p-4 text-slate-100'>
			{authUser ? (
			<div className='mb-5 flex items-center gap-3'>
				<UserAvatar
					src={authUser.profilePic}
					name={authUser.fullName}
					alt={authUser.fullName}
					className='h-12 w-12 rounded-2xl ring-1 ring-teal-300/20'
					textClassName='text-lg'
				/>
				<div className='min-w-0 flex-1'>
					<p className='truncate text-lg font-semibold'>{authUser.fullName}</p>
					<p className='truncate text-sm text-slate-400'>Stay connected with your people</p>
				</div>
			</div>
			) : null}
			<SearchInput search={search} setSearch={setSearch} conversations={conversations} />
			<div className='my-4 flex items-center justify-between px-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500'>
				<span>Chats</span>
				<span>{filteredConversations.length}</span>
			</div>
			<Conversations conversations={filteredConversations} loading={loading} search={search} />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;

// STARTER CODE FOR THIS FILE
// import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";
// import SearchInput from "./SearchInput";

// const Sidebar = () => {
// 	return (
// 		<div className='border-r border-slate-500 p-4 flex flex-col'>
// 			<SearchInput />
// 			<div className='divider px-3'></div>
// 			<Conversations />
// 			<LogoutButton />
// 		</div>
// 	);
// };
// export default Sidebar;
