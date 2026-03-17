import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import CallOverlay from "./components/call/CallOverlay";

function App() {
	const { authUser } = useAuthContext();
	return (
		<div className='relative min-h-screen overflow-hidden bg-slate-950 p-4 text-slate-100'>
			<div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.16),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(56,189,248,0.12),_transparent_26%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]' />
			<div className='pointer-events-none absolute left-[-8rem] top-[-7rem] h-72 w-72 rounded-full bg-teal-400/10 blur-3xl' />
			<div className='pointer-events-none absolute bottom-[-8rem] right-[-5rem] h-80 w-80 rounded-full bg-sky-500/10 blur-3xl' />
			<div className='relative flex min-h-[calc(100vh-2rem)] items-center justify-center'>
				<Routes>
					<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
					<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
					<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
				</Routes>
			</div>
			<CallOverlay />
			<Toaster />
		</div>
	);
}

export default App;
