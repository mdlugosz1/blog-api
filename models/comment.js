import { Schema as model, _Schema } from "mongoose";

const Schema = _Schema;

const CommentSchema = new Schema({
	author: { type: String, required: true },
	content: { type: String, required: true },
	date: Date,
});

export default model("Comment", CommentSchema);
