const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const postsCases = require("../usecases/posts.usecases");

router.get("/", async (req, res) => {
  try {
    const posts = await postsCases.getAll();
    res.status(200).json({ success: true, message: "Posts", data: posts });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPost = await postsCases.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "Post created", data: newPost });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

module.exports = router;
