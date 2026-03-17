import Conversation from "./Conversation";

const Conversations = ({ conversations, loading, search }) => {
	return (
		<div className='flex min-h-0 flex-1 flex-col overflow-auto pr-1'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto mt-8'></span> : null}
			{!loading && conversations.length === 0 ? (
				<div className='rounded-3xl border border-dashed border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-slate-400'>
					{search ? "No contacts matched your search." : "No conversations available yet."}
				</div>
			) : null}
		</div>
	);
};
export default Conversations;

// STARTER CODE SNIPPET
// import Conversation from "./Conversation";

// const Conversations = () => {
// 	return (
// 		<div className='py-2 flex flex-col overflow-auto'>
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 		</div>
// 	);
// };
// export default Conversations;
