const Post = require("../models/post.model");
const createError = require("http-errors");

async function create(data) {
  const newPost = await Post.create(data);
  return newPost;
}

async function getAll() {
  const posts = await Post.find({});
  return posts;
}

async function searchByTitle(search) {
  const posts = await Post.find({ title: new RegExp(search, "i") });
  if (!posts) {
    return ["No posts found"];
  } else return posts;
}

async function updateById(id, data) {
  const post = await Post.findById(id);
  if (!post) {
    throw createError(404, "User not found");
  }
  const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true });
  return updatedPost;
}

async function deleteById(id) {
  const post = await Post.findById(id);
  if (!post) {
    throw createError(404, "Post not found");
  }
  const deletedPost = await Post.findByIdAndDelete(id);
  return deletedPost;
}

module.exports = { create, getAll, updateById, deleteById, searchByTitle };
