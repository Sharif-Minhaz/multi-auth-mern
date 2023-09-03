import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "./../contexts/AuthContext";

export default function Protected({ children }) {
	const { isAuthenticated, loading } = useAuth();

	if (isAuthenticated()) {
		return children;
	} else if (loading) {
		return <p>Loading...</p>;
	}

	return <Navigate to="/" replace />;
}

Protected.propTypes = {
	children: PropTypes.any,
};
