import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useConversation from "../../zustand/useConversation";

const Home = () => {
	const { selectedConversation } = useConversation();

	return (
		<div className='relative flex h-[calc(100vh-2rem)] w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/[0.65] shadow-[0_30px_80px_rgba(15,23,42,0.55)] backdrop-blur-2xl'>
			<div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_28%)]' />
			<div className={`h-full w-full md:w-[380px] ${selectedConversation ? "hidden md:block" : "block"}`}>
				<Sidebar />
			</div>
			<div className={`h-full flex-1 ${selectedConversation ? "block" : "hidden md:block"}`}>
				<MessageContainer />
			</div>
		</div>
	);
};
export default Home;
