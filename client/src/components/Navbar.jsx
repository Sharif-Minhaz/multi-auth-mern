import { Link, NavLink } from "react-router-dom";
import { logout } from "../apis/services/authServices";
import { useAuth } from "../contexts/AuthContext"; // Import the useAuth hook

export default function Navbar() {
	const {user, isAuthenticated, clearUserInfo } = useAuth();

	const handleLogout = async () => {
		try {
			const isSuccessful = await logout();

			if (isSuccessful) {
				clearUserInfo();
				return alert("Logout successful");
			}

			alert("Logout failed!");
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<nav className="bg-blue-600 text-white p-3  flex justify-between">
			<ul className="flex gap-3">
				<li>
					<NavLink to="/">Home</NavLink>
				</li>
				{isAuthenticated() && (
					<li>
						<NavLink to="/dashboard">Dashboard</NavLink>
					</li>
				)}
			</ul>
			<ul className="flex gap-3">
				{!isAuthenticated() && (
					<li>
						<NavLink to="/register">Register</NavLink>
					</li>
				)}
				{!isAuthenticated() && (
					<li>
						<NavLink to="/login">Login</NavLink>
					</li>
				)}
				{isAuthenticated() && (
					<li className="cursor-pointer">
						<Link to="/profile">
							<img className="w-[26px] h-[26px] rounded-full" src={user.image} alt="profile" />
						</Link>
					</li>
				)}
				{isAuthenticated() && (
					<li className="cursor-pointer" onClick={handleLogout}>
						Logout
					</li>
				)}
			</ul>
		</nav>
	);
}
