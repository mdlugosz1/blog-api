const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
	"login",
	new LocalStrategy((username, password, done) => {
		User.findOne({ username }, (err, user) => {
			if (err) {
				return done(err);
			}

			if (!user) {
				return done(null, false, { msg: "Incorrect username" });
			}

			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					done(null, user);
				} else {
					done(null, false, { msg: "Incorrect password" });
				}
			});
		});
	})
);

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.SECRET,
		},
		function (jwtPayload, done) {
			return done(null, jwtPayload);
		}
	)
);
