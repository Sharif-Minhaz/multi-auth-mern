import api from "../api";

export const login = async (credentials) => {
	try {
		const response = await api.post("/auth/login", credentials, { withCredentials: true });

		const isSuccessful = response.data?.success;

		return isSuccessful ? response.data : false;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const loggedInUserInfo = async () => {
	try {
		const response = await api.get("/auth/login-info", { withCredentials: true });
		const user = response.data?.user;

		return user;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const register = async (userData) => {
	try {
		const response = await api.post("/auth/register", userData);

		const isSuccessful = response.data?.success;

		return isSuccessful;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const logout = async () => {
	try {
		const response = await api.post("/auth/logout", {}, { withCredentials: true });

		const isSuccessful = response.data?.success;

		return isSuccessful;
	} catch (error) {
		throw new Error(error.message);
	}
};
