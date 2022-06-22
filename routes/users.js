var express = require("express");
var router = express.Router();
const passport = require("passport");

const user_controller = require("../controllers/userController");

/* GET users listing. */
router.get("/", user_controller.user_list);

/* Create user */
router.post("/", user_controller.user_create);

/* Login user */
router.post("/login", user_controller.user_login);

/* Get user profile */
router.get(
	"/:id/profile",
	passport.authenticate("jwt", { session: false }),
	user_controller.user_profile
);

/* Update user profile */
router.put(
	"/:id/profile",
	passport.authenticate("jwt", { session: false }),
	user_controller.update_user_profile
);

module.exports = router;
