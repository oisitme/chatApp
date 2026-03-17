import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { HiOutlineChatBubbleLeftRight, HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		<div className='grid w-full max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]'>
			<div className='hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-slate-100 shadow-[0_20px_70px_rgba(15,23,42,0.35)] lg:block'>
				<div className='flex h-16 w-16 items-center justify-center rounded-3xl bg-teal-400/[0.15] text-teal-100'>
					<HiOutlineChatBubbleLeftRight className='h-8 w-8' />
				</div>
				<h1 className='mt-8 text-4xl font-semibold leading-tight'>
					Professional messaging for fast, focused conversations.
				</h1>
				<p className='mt-4 max-w-md text-sm leading-7 text-slate-400'>
					Sign in to chat in real time, keep your contacts close, and enjoy a cleaner experience built for quick messaging.
				</p>
				<div className='mt-10 grid gap-4 text-sm text-slate-300'>
					<div className='rounded-3xl border border-white/10 bg-slate-900/70 p-4'>
						<p className='font-semibold text-slate-100'>Live online presence</p>
						<p className='mt-1 text-slate-400'>See who is available and jump straight into the conversation.</p>
					</div>
					<div className='rounded-3xl border border-white/10 bg-slate-900/70 p-4'>
						<p className='font-semibold text-slate-100'>Faster message updates</p>
						<p className='mt-1 text-slate-400'>Optimistic sending makes chats feel quick even during rapid back-and-forth.</p>
					</div>
				</div>
			</div>

			<div className='mx-auto flex w-full max-w-md flex-col justify-center rounded-[2rem] border border-white/10 bg-slate-950/[0.72] p-8 shadow-[0_20px_70px_rgba(15,23,42,0.4)] backdrop-blur-xl'>
				<p className='text-sm uppercase tracking-[0.3em] text-teal-300'>Welcome back</p>
				<h1 className='mt-3 text-3xl font-semibold text-slate-100'>
					Sign in to <span className='text-teal-300'>ChatApp</span>
				</h1>
				<p className='mt-2 text-sm text-slate-400'>Continue your conversations with a cleaner, modern messenger.</p>

				<form onSubmit={handleSubmit}>
					<div className='mt-8'>
						<label className='mb-2 block text-sm font-medium text-slate-300'>Username</label>
						<input
							type='text'
							placeholder='Enter username'
							className='h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400/60 focus:bg-slate-900/80'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div className='mt-5'>
						<label className='mb-2 block text-sm font-medium text-slate-300'>Password</label>
						<div className='relative'>
							<input
								type={showPassword ? "text" : "password"}
								placeholder='Enter Password'
								className='h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 pr-12 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400/60 focus:bg-slate-900/80'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								type='button'
								onClick={() => setShowPassword((current) => !current)}
								className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-200'
								aria-label={showPassword ? "Hide password" : "Show password"}
							>
								{showPassword ? <HiOutlineEyeSlash className='h-5 w-5' /> : <HiOutlineEye className='h-5 w-5' />}
							</button>
						</div>
					</div>

					<Link to='/signup' className='mt-4 inline-block text-sm text-slate-400 transition hover:text-teal-300 hover:underline'>
						{"Don't"} have an account?
					</Link>

					<div className='mt-6'>
						<button
							className='flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-teal-400 to-sky-500 text-sm font-semibold text-slate-950 transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70'
							disabled={loading}
						>
							{loading ? <span className='loading loading-spinner '></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;

// STARTER CODE FOR THIS FILE
// const Login = () => {
// 	return (
// 		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
// 			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
// 				<h1 className='text-3xl font-semibold text-center text-gray-300'>
// 					Login
// 					<span className='text-blue-500'> ChatApp</span>
// 				</h1>

// 				<form>
// 					<div>
// 						<label className='label p-2'>
// 							<span className='text-base label-text'>Username</span>
// 						</label>
// 						<input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' />
// 					</div>

// 					<div>
// 						<label className='label'>
// 							<span className='text-base label-text'>Password</span>
// 						</label>
// 						<input
// 							type='password'
// 							placeholder='Enter Password'
// 							className='w-full input input-bordered h-10'
// 						/>
// 					</div>
// 					<a href='#' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
// 						{"Don't"} have an account?
// 					</a>

// 					<div>
// 						<button className='btn btn-block btn-sm mt-2'>Login</button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };
// export default Login;
