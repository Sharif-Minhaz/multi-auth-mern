const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		mongoose.set("strictQuery", false); // to avoid deprecation message
		const conn = await mongoose.connect(process.env.CONNECTION_URI);
		console.info(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

module.exports = connectDB;
