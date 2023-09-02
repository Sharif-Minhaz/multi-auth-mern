const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const corsOptions = {
	origin: "http://localhost:5173",
	credentials: true,
};

const middlewares = [
	cors(corsOptions),
	cookieParser(),
	express.json(),
	express.urlencoded({ extended: true }),
];

module.exports = (app) => {
	app.use(middlewares);
};
