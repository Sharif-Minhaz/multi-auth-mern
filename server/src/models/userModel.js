const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, "User name is required"],
			maxLength: [31, "Length of username is can be max 31 chars"],
			minLength: [2, "Length of username is can be min 2 chars"],
		},

		email: {
			type: String,
			required: [true, "Email required"],
			unique: true,
			lowercase: true,
			immutable: true,
			validate: {
				validator: (value) => {
					return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value);
				},
				message: "Please enter a valid email",
			},
		},

		password: {
			type: String,
			minLength: [6, "Length of password is can be min 6 chars"],
			set: (value) => bcrypt.hashSync(value, bcrypt.genSaltSync(10)),
			select: false,
		},

		image: {
			type: String,
			default:
				"https://res.cloudinary.com/hostingimagesservice/image/upload/v1680632612/mediAid/default-profile-pic_lktd2q.webp",
		},

		authType: {
			type: String,
			enum: ["google", "fb", "gh", "form"],
			default: "form",
		},
	},
	{ timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
