import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../apis/services/authServices";
import { useAuth } from "../contexts/AuthContext";

const initialFormData = {
	email: "",
	password: "",
};

export default function Login() {
	const { addUserInfo } = useAuth();
	const [formData, setFormData] = useState(initialFormData);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const runLogin = await login(formData);
			if (runLogin) {
				addUserInfo(runLogin?.user);
				setFormData(initialFormData);
				return navigate("/dashboard", { replace: true });
			}
			alert("Login failed, try again!");
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<div className="w-[500px] mx-auto mt-10">
			<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
				<div>
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						value={formData.email}
						onChange={handleChange}
						name="email"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="John@gmail.com"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="password"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Password
					</label>
					<input
						name="password"
						value={formData.password}
						onChange={handleChange}
						type="password"
						id="password"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="*********"
						required
					/>
				</div>
				<button type="submit" className="bg-blue-600 text-white p-2 rounded-lg">
					Login
				</button>
				<p>
					Don&apos;t have an account?{" "}
					<Link className="text-blue-600" to="/register">
						Register now
					</Link>
				</p>
			</form>
		</div>
	);
}
