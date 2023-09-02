import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div>
			<h1 className="text-2xl text-center my-5">
				This is home page, <Link className="text-blue-600 underline" to="/login">login</Link> to visit dashboard
			</h1>
		</div>
	);
}
