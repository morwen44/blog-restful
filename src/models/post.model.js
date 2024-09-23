const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const reactionSchema = new mongoose.Schema({
  emoji: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  tags: {
    type: Array,
    required: false,
  },
  comments: [commentSchema],
  reactions: [reactionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  relevance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("post", postSchema);
