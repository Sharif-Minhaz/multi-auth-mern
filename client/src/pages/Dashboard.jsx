import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
	const { user } = useAuth();

	return (
		<div>
			<h1 className="text-2xl text-center my-5">Welcome &apos;{user.name}&apos;, to the Dashboard.</h1>
		</div>
	);
}
