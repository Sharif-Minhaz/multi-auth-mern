import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { loggedInUserInfo } from "../apis/services/authServices";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchUserInfo() {
			const userInfo = await loggedInUserInfo();
			setUser(userInfo);
			setLoading(false);
		}

		fetchUserInfo();
	}, []);

	const addUserInfo = (userData) => {
		// Perform your login logic and set user data
		setUser(userData);
	};

	const clearUserInfo = () => {
		// Perform logout logic and clear user data
		setUser({});
	};

	const isAuthenticated = () => {
		// Check if the user is authenticated (e.g., check if user data exists)
		return Object.keys(user).length === 0 ? false : true;
	};

	return (
		<AuthContext.Provider
			value={{ user, loading, addUserInfo, clearUserInfo, isAuthenticated }}
		>
			{children}
		</AuthContext.Provider>
	);
}

AuthProvider.propTypes = {
	children: PropTypes.any,
};
