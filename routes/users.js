var express = require("express");
var router = express.Router();
const passport = require("passport");

const user_controller = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

/* Create user */
router.post("/", user_controller.user_create);

/* Login user */
router.post("/login", user_controller.user_login);

/* Get user profile */
router.get(
	"/profile",
	passport.authenticate("jwt", { session: false }),
	user_controller.user_profile
);

module.exports = router;
