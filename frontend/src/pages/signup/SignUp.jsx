import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlineShieldCheck } from "react-icons/hi2";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<div className='grid w-full max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr]'>
			<div className='mx-auto flex w-full max-w-md flex-col justify-center rounded-[2rem] border border-white/10 bg-slate-950/[0.72] p-8 shadow-[0_20px_70px_rgba(15,23,42,0.4)] backdrop-blur-xl'>
				<p className='text-sm uppercase tracking-[0.3em] text-teal-300'>Create account</p>
				<h1 className='mt-3 text-3xl font-semibold text-slate-100'>
					Join <span className='text-teal-300'>ChatApp</span>
				</h1>
				<p className='mt-2 text-sm text-slate-400'>Set up your profile and start chatting in a more polished workspace.</p>

				<form onSubmit={handleSubmit}>
					<div className='mt-8'>
						<label className='mb-2 block text-sm font-medium text-slate-300'>Full Name</label>
						<input
							type='text'
							placeholder='John Doe'
							className='h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400/60 focus:bg-slate-900/80'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>

					<div className='mt-5'>
						<label className='mb-2 block text-sm font-medium text-slate-300'>Username</label>
						<input
							type='text'
							placeholder='johndoe'
							className='h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400/60 focus:bg-slate-900/80'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

					<div className='mt-5'>
						<label className='mb-2 block text-sm font-medium text-slate-300'>Password</label>
						<div className='relative'>
							<input
								type={showPassword ? "text" : "password"}
								placeholder='Enter Password'
								className='h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 pr-12 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400/60 focus:bg-slate-900/80'
								value={inputs.password}
								onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
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

					<div className='mt-5'>
						<label className='mb-2 block text-sm font-medium text-slate-300'>Confirm Password</label>
						<div className='relative'>
							<input
								type={showConfirmPassword ? "text" : "password"}
								placeholder='Confirm Password'
								className='h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 pr-12 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400/60 focus:bg-slate-900/80'
								value={inputs.confirmPassword}
								onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
							/>
							<button
								type='button'
								onClick={() => setShowConfirmPassword((current) => !current)}
								className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-200'
								aria-label={showConfirmPassword ? "Hide password" : "Show password"}
							>
								{showConfirmPassword ? (
									<HiOutlineEyeSlash className='h-5 w-5' />
								) : (
									<HiOutlineEye className='h-5 w-5' />
								)}
							</button>
						</div>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					<Link
						to={"/login"}
						className='mt-4 inline-block text-sm text-slate-400 transition hover:text-teal-300 hover:underline'
						href='#'
					>
						Already have an account?
					</Link>

					<div className='mt-6'>
						<button
							className='flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-teal-400 to-sky-500 text-sm font-semibold text-slate-950 transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70'
							disabled={loading}
						>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>

			<div className='hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-slate-100 shadow-[0_20px_70px_rgba(15,23,42,0.35)] lg:block'>
				<div className='flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-500/[0.15] text-sky-100'>
					<HiOutlineShieldCheck className='h-8 w-8' />
				</div>
				<h2 className='mt-8 text-4xl font-semibold leading-tight'>Create your identity and start messaging right away.</h2>
				<p className='mt-4 max-w-md text-sm leading-7 text-slate-400'>
					Build your profile once, then enjoy a contact list, real-time updates, and a cleaner chat interface across desktop and mobile.
				</p>
				<div className='mt-10 space-y-4 text-sm text-slate-300'>
					<div className='rounded-3xl border border-white/10 bg-slate-900/70 p-4'>
						<p className='font-semibold text-slate-100'>Quick onboarding</p>
						<p className='mt-1 text-slate-400'>Minimal setup so new users can move from signup to chatting quickly.</p>
					</div>
					<div className='rounded-3xl border border-white/10 bg-slate-900/70 p-4'>
						<p className='font-semibold text-slate-100'>Responsive experience</p>
						<p className='mt-1 text-slate-400'>The updated layout works more naturally on both mobile and desktop screens.</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SignUp;

// STARTER CODE FOR THE SIGNUP COMPONENT
// import GenderCheckbox from "./GenderCheckbox";

// const SignUp = () => {
// 	return (
// 		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
// 			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
// 				<h1 className='text-3xl font-semibold text-center text-gray-300'>
// 					Sign Up <span className='text-blue-500'> ChatApp</span>
// 				</h1>

// 				<form>
// 					<div>
// 						<label className='label p-2'>
// 							<span className='text-base label-text'>Full Name</span>
// 						</label>
// 						<input type='text' placeholder='John Doe' className='w-full input input-bordered  h-10' />
// 					</div>

// 					<div>
// 						<label className='label p-2 '>
// 							<span className='text-base label-text'>Username</span>
// 						</label>
// 						<input type='text' placeholder='johndoe' className='w-full input input-bordered h-10' />
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

// 					<div>
// 						<label className='label'>
// 							<span className='text-base label-text'>Confirm Password</span>
// 						</label>
// 						<input
// 							type='password'
// 							placeholder='Confirm Password'
// 							className='w-full input input-bordered h-10'
// 						/>
// 					</div>

// 					<GenderCheckbox />

// 					<a className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
// 						Already have an account?
// 					</a>

// 					<div>
// 						<button className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
// 					</div>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };
// export default SignUp;
