const express = require("express");
const app = express();
const { errorMiddleware } = require("./middlewares/errorMiddleware");

require("./middlewares/middlewares")(app);
require("./routes/routes")(app);

app.get("/test", (req, res) => {
	res.status(200).send({ status: "All Good", message: "Server is running." });
});

// client error
app.use((req, res, next) => {
	next(new Error("Page not found!"));
});

// server error
app.use(errorMiddleware);

module.exports = app;
