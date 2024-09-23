const Post = require("../models/post.model");
const User = require("../models/user.model");
const createError = require("http-errors");

async function create(data) {
  const newPost = await Post.create(data);
  return newPost;
}

async function getAll(search) {
  let filter = {};

  if (search) {
    filter.title = new RegExp(search, "i"); 
  }

  const posts = await Post.find(filter).populate("user");
  console.log(filter)
  if (!posts) {
    throw createError(404, "Posts not found");
  }

  return posts;
}

async function updateById(id, data) {
  const post = await Post.findById(id).populate("user");
  if (!post) {
    throw createError(404, "User not found");
  }
  if (data.user) {
    throw createError(400, "User cannot be updated");
  }
  const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true });
  return updatedPost;
}

async function deleteById(id) {
  const post = await Post.findById(id).populate("user");
  if (!post) {
    throw createError(404, "Post not found");
  }
  const deletedPost = await Post.findByIdAndDelete(id);
  return deletedPost;
}

async function getCommentsByPostId(postId) {
  const post = await Post.findById(postId).populate("comments.user");
  if (!post) {
    throw createError(404, "Post not found");
  }
  return post.comments;
}

async function addReaction(postId, emoji) {
  const post = await Post.findById(postId);
  if (!post) {
    throw createError(404, "Post not found");
  }

  const existingReaction = post.reactions.find(r => r.emoji === emoji);
  if (existingReaction) {
    existingReaction.count += 1; 
  } else {
    post.reactions.push({ emoji, count: 1 }); 
  }

  await post.save();
  return post;
}

module.exports = { create, getAll, updateById, deleteById, addReaction, getCommentsByPostId };
