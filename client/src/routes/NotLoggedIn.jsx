import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "./../contexts/AuthContext";

export default function NotLoggedIn({ children }) {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated()) {
		return <Navigate to="/dashboard" replace />;
	}

	return children;
}

NotLoggedIn.propTypes = {
	children: PropTypes.any,
};
