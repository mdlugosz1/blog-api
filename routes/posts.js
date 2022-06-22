const express = require("express");
const router = express.Router();

const post_controller = require("../controllers/postController");

//Get all posts
router.get("/", post_controller.post_list);

//Create post
router.post("/", post_controller.add_post);

//Get single post
router.get("/:id", post_controller.single_post);

//Update post
router.put("/:id/update", post_controller.update_post);

module.exports = router;
