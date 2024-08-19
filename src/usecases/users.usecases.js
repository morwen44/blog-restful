const User = require("../models/user.model");
const createError = require("http-errors");

async function create(data) {
  const newUser = await User.create(data);
  return newUser;
}

function login() {}

async function getById(id) {
  const user = await User.findById(id);

  return user;
}

async function deleteById(id) {
  const user = await User.findById(id);
  if (!user) {
    throw createError(404, "User not found");
  }
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
}

module.exports = { create, login, getById, deleteById };
