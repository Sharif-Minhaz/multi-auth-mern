import PropTypes from "prop-types";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useAuth } from "../contexts/AuthContext";
import { continueWithGoogle } from "../apis/services/authServices";
import { useNavigate } from "react-router-dom";

export default function ContinueWithGoogle({ text = "continue_with" }) {
	const navigate = useNavigate();
	const { addUserInfo } = useAuth();

	// Callback for successful login
	const handleSuccess = async (response) => {
		const { email, name, picture } = jwtDecode(response.credential);
		const userInfo = {
			email,
			name,
			image: picture,
		};

		addUserInfo(userInfo);

		try {
			const runLogin = await continueWithGoogle({ email, name, image: picture });
			if (runLogin?.success) {
				addUserInfo(runLogin?.user);
				return navigate("/dashboard", { replace: true });
			}
		} catch (error) {
			alert(error.message);
		}
	};

	// Callback for unsuccessful login
	const handleFailure = (response) => {
		alert("Something went wrong! check console.");
		console.error(response);
	};

	return (
		<GoogleLogin
			text={text}
			auto_select
			useOneTap
			onSuccess={handleSuccess}
			onError={handleFailure}
		/>
	);
}

ContinueWithGoogle.propTypes = {
	text: PropTypes.string,
};
