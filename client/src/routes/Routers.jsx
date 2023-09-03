import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Protected from "./Protected";
import NotLoggedIn from "./NotLoggedIn";

export default function Routers() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route
				path="/dashboard"
				element={
					<Protected>
						<Dashboard />
					</Protected>
				}
			/>
			<Route
				path="/profile"
				element={
					<Protected>
						<Profile />
					</Protected>
				}
			/>
			<Route
				path="/login"
				element={
					<NotLoggedIn>
						<Login />
					</NotLoggedIn>
				}
			/>
			<Route
				path="/register"
				element={
					<NotLoggedIn>
						<Register />
					</NotLoggedIn>
				}
			/>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
