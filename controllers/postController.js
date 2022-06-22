const { body, validationResult } = require("express-validator");
const Post = require("../models/post");

exports.post_list = function (req, res, next) {
	Post.find({})
		.populate("author")
		.exec((err, posts) => {
			if (err) {
				return next(err);
			}

			res.json(posts);
		});
};

exports.single_post = function (req, res, next) {
	Post.find({ _id: req.params.id }, (err, post) => {
		if (err) {
			return next(err);
		}

		res.json(post);
	});
};

exports.add_post = [
	body("title").trim().escape().notEmpty(),
	body("content").trim().escape(),
	(req, res, next) => {
		const errors = validationResult(req);
		const post = new Post({
			author: req.body.author,
			title: req.body.title,
			content: req.body.content,
			date: new Date(),
			published: false,
		});

		if (!errors.isEmpty()) {
			res.json({
				msg: "Something went wrong",
				errors: errors.mapped(),
			});
		} else {
			post.save((err) => {
				if (err) {
					return next(err);
				}

				res.json({
					msg: "Post was succesfully saved",
				});
			});
		}
	},
];

exports.update_post = [
	body("title").trim().escape().notEmpty(),
	body("content").trim().escape(),
	(req, res, next) => {
		const errors = validationResult(req);
		const updatedPost = {
			title: req.body.title,
			content: req.body.content,
		};

		if (!errors.isEmpty()) {
			res.json(errors.mapped());
		} else {
			Post.findByIdAndUpdate(req.params.id, updatedPost, (err) => {
				if (err) {
					return next(err);
				}

				res.json({
					msg: "Post successfully edited",
				});
			});
		}
	},
];
