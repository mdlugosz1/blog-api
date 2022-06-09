const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.user_create = [
	body("username")
		.trim()
		.isLength({ min: 5 })
		.custom(async (value) => {
			const user = await User.find({
				username: value,
			});

			if (user.length > 0) {
				throw new Error("User already exist!");
			}
			return true;
		}),
	body("password").isLength({ min: 8 }),
	body("confirmPassword").custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error(`Password doesn't match!`);
		}
		return true;
	}),
	body("firstName").trim().escape(),
	body("lastName").trim().escape(),
	body("email").normalizeEmail().isEmail().isLength({ min: 8 }).toLowerCase(),
	(req, res, next) => {
		bcrypt.hash(req.body.password, 10, (err, hash) => {
			const errors = validationResult(req);

			const user = new User({
				username: req.body.username,
				password: hash,
				first_name: req.body.firstName,
				last_name: req.body.lastName,
				email: req.body.email,
			});

			if (!errors.isEmpty()) {
				return res.json(errors.mapped());
			} else {
				user.save((err) => {
					if (err) {
						return next(err);
					}

					return res.status(200).json({
						status: res.statusCode,
						msg: `User ${user.username} succesfully created!`,
					});
				});
			}
		});
	},
];

exports.user_login = function (req, res, next) {
	passport.authenticate("login", { session: false }, (err, user, info) => {
		if (err || !user) {
			res.status(400).json({
				code: res.statusCode,
				msg: "Something went wrong",
			});
		}

		jwt.sign({ user }, process.env.SECRET, { expiresIn: "2h" }, (err, token) => {
			if (err) {
				return res.status(400).json({ err, code: res.statusCode });
			}

			return res.status(200).json({
				status: res.statusCode,
				user: user.username,
				token,
			});
		});
	})(req, res);
};

exports.user_profile = function (req, res, next) {
	res.json(req.user);
};
