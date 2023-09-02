import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:8080/api", // Replace with your API's base URL
	timeout: 10000, // Set a timeout for requests if needed
});

export default api;
