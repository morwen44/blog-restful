const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const postsCases = require("../usecases/posts.usecases");
const auth = require("../middlewares/auth");
const Post = require("../models/post.model");

router.get("/", async (req, res) => {
  try {
    const search = req.query.search;
    const posts = await postsCases.getAll(search);
    res.status(200).json({ success: true, message: "Posts", data: posts });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
});

router.post("/", auth, async (req, res) => {
  const postData = {
    ...req.body,
    user: req.user,
  };
  console.log(postData);
  try {
    const newPost = await postsCases.create(postData);

    res
      .status(201)
      .json({ success: true, message: "Post created", data: newPost });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedPost = await postsCases.updateById(id, data);
    res
      .status(200)
      .json({ success: true, message: "Post updated", data: updatedPost });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await postsCases.deleteById(id);
    res
      .status(200)
      .json({ success: true, message: "Post deleted", data: deletedPost });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
});

router.post("/:postId/comments", auth, async (req, res) => {
  const { postId } = req.params;
  const { body } = req.body;

  let post;

  try {
    post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      body,
      user: req.user,
      createdAt: new Date(),
    };

    await post.populate("comments.user");

    post.comments.push(newComment);
    await post.save(); //

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Failed to add comment" });
  }
});

router.get("/:postId/comments", async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate("comments.user");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post.comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
});

module.exports = router;
