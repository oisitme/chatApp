import { IoSearchSharp } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi2";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const SearchInput = ({ search, setSearch, conversations }) => {
	const { setSelectedConversation } = useConversation();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};
	return (
		<form onSubmit={handleSubmit} className='relative flex items-center gap-2'>
			<div className='relative flex-1'>
				<IoSearchSharp className='pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500' />
				<input
					type='text'
					placeholder='Search by name or username'
					className='h-[3.25rem] w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400/60 focus:bg-slate-900/80'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<button
				type='submit'
				className='flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl border border-teal-400/20 bg-teal-400/[0.15] text-teal-100 transition hover:bg-teal-400/25'
				aria-label='Start chat from search'
			>
				<HiOutlineSparkles className='h-5 w-5' />
			</button>
		</form>
	);
};
export default SearchInput;

// STARTER CODE SNIPPET
// import { IoSearchSharp } from "react-icons/io5";

// const SearchInput = () => {
// 	return (
// 		<form className='flex items-center gap-2'>
// 			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' />
// 			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
// 				<IoSearchSharp className='w-6 h-6 outline-none' />
// 			</button>
// 		</form>
// 	);
// };
// export default SearchInput;
