import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "./../contexts/AuthContext";

export default function Protected({ children }) {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated()) {
		return children;
	}

	return <Navigate to="/" replace />;
}

Protected.propTypes = {
	children: PropTypes.any,
};
