const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { createJsonWebToken, verifyJsonWebToken } = require("../helper/jsonwebtoken");

exports.registerController = asyncHandler(async (req, res) => {
	const usersExists = await User.exists({ email: req.body?.email });

	if (usersExists) {
		return res.status(409).json({
			success: false,
			message: "User already exits",
		});
	}

	const addUser = await User.create(req.body);

	if (addUser) {
		return res.status(201).json({
			success: true,
			message: "User registered successfully",
			user: addUser,
		});
	}

	res.status(500).json({
		success: false,
		message: "Failed to send mail",
	});
});

exports.loginController = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email }).select("_id name email image +password");

	if (!user) return res.status(401).json({ success: false, message: "Credential error" });

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch)
		return res.status(401).json({ success: false, message: "Credential error" });

	const authToken = createJsonWebToken(
		{ _id: user._id, email: user.email, name: user.name, image: user.image },
		process.env.JWT_AUTH_TOKEN_SECRET,
		"7d"
	);

	res.cookie("auth_token", authToken, {
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		httpOnly: true,
		secure: true,
		sameSite: "none",
	});

	delete user._doc?.password;

	res.status(200).json({
		success: true,
		message: "Login successful",
		user,
	});
});

exports.getLoggedInInformation = asyncHandler(async (req, res) => {
	const token = req.cookies.auth_token;

	if (token) {
		const decoded = verifyJsonWebToken(token, process.env.JWT_AUTH_TOKEN_SECRET);

		req.decoded = decoded;
		if (!decoded)
			return res.status(200).json({ success: false, message: "Token expired", user: {} });

		return res.status(200).json({
			success: true,
			message: "User logged in",
			user: decoded,
		});
	}

	res.status(200).json({
		success: false,
		message: "Unauthorized, Login required",
		user: {},
	});
});

exports.logoutController = asyncHandler(async (req, res) => {
	res.clearCookie("auth_token");

	res.status(200).json({
		success: true,
		message: "User logout successfully",
	});
});
