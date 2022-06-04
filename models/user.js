import mongoose, { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const UserSchema = new Schema({
	username: { type: String, required: true, minlength: 5 },
	password: { type: String, required: true, minlength: 8 },
	first_name: { type: String },
	last_name: { type: String },
	email: { type: String, minlength: 8 },
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
	admin: Boolean,
});

export default model("User", UserSchema);
