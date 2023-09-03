import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContinueWithGoogle from "../components/ContinueWithGoogle";
import Divider from "./../components/Divider";
import { register } from "../apis/services/authServices";

const initialFormData = {
	name: "",
	email: "",
	password: "",
};

export default function Register() {
	const [formData, setFormData] = useState(initialFormData);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const runLogin = await register(formData);
			if (runLogin) {
				setFormData(initialFormData);
				return navigate("/login", { replace: true });
			}
			alert("Registration failed, try again!");
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<div className="w-[500px] mx-auto mt-10">
			<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
				<div>
					<label
						htmlFor="name"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Name
					</label>
					<input
						value={formData.name}
						onChange={handleChange}
						type="text"
						id="name"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="John"
						required
						name="name"
					/>
				</div>
				<div>
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Email
					</label>
					<input
						value={formData.email}
						onChange={handleChange}
						type="email"
						name="email"
						id="email"
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
						value={formData.password}
						onChange={handleChange}
						type="password"
						id="password"
						name="password"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="*********"
						required
					/>
				</div>
				<button type="submit" className="bg-blue-600 text-white p-2 rounded-lg">
					Register
				</button>
				<p>
					Already have an account?{" "}
					<Link className="text-blue-600" to="/login">
						Login now
					</Link>
				</p>
			</form>
			<Divider className="mt-3 mb-4" text="or" />
			<ContinueWithGoogle />
		</div>
	);
}
