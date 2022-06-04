import mongoose, { Schema as model, _Schema } from "mongoose";

const Schema = _Schema;

const PostSchema = new Schema({
	author: { type: String },
	title: { type: String, required: true },
	content: { type: String, required: true },
	date: { type: Date },
	published: Boolean,
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export default model("Post", PostSchema);
