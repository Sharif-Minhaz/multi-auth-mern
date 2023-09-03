const router = require("express").Router();
const {
	loginController,
	logoutController,
	registerController,
	getLoggedInInformation,
	loginWithGoogleController,
} = require("../controllers/authController");
const { isLoggedIn, isLoggedOut } = require("../middlewares/authMiddleware");

router.post("/register", isLoggedOut, registerController);
router.post("/login", isLoggedOut, loginController);
router.post("/continue-google", isLoggedOut, loginWithGoogleController);
router.get("/login-info", getLoggedInInformation);
router.post("/logout", isLoggedIn, logoutController);

module.exports = router;
