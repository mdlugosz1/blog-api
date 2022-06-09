const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: { type: String, required: true, minlength: 5 },
	password: { type: String, required: true, minlength: 8 },
	first_name: { type: String },
	last_name: { type: String },
	email: { type: String, minlength: 8 },
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
	admin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
