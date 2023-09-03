import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
	const { user } = useAuth();

	return (
		<article className="w-[400px] shadow-md rounded-lg mx-auto my-10 flex flex-col items-center justify-center gap-4 p-5">
			<img className="rounded-full ring-1 ring-blue-500 w-24 h-24" src={user.image} alt={user.name} />
			<div className="mt-2">
				<h3 className="text-2xl text-center mb-1.5">
					<strong>Name: </strong>
					{user.name}
				</h3>
				<p className="text-center">
					<strong>Email: </strong>
					{user.email}
				</p>
			</div>
			<Link to="/dashboard">
				<button className="bg-slate-200 px-4 py-2 rounded-md hover:shadow-lg transition-shadow">
					Dashboard
				</button>
			</Link>
		</article>
	);
}
