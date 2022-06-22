const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
	title: { type: String, required: true },
	content: { type: String, required: true },
	date: { type: Date, default: new Date() },
	published: Boolean,
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Post", PostSchema);
