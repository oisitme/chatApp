import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-4 border-t border-white/10 pt-4'>
			{!loading ? (
				<button
					type='button'
					onClick={logout}
					className='flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/[0.08]'
				>
					<BiLogOut className='h-5 w-5' />
					Log out
				</button>
			) : (
				<span className='loading loading-spinner mx-auto block'></span>
			)}
		</div>
	);
};
export default LogoutButton;
