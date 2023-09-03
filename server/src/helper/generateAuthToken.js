const asyncHandler = require("express-async-handler");
const { createJsonWebToken } = require("./jsonwebtoken");

exports.generateAuthToken = asyncHandler(async (req, res,) => {
	const { user } = req;

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

});
