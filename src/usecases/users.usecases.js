const User = require("../models/user.model");
const encryption = require("../lib/encryption");
const jwt = require("../lib/jwt");
const createError = require("http-errors");

async function signUp(data) {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw createError(409, "Email already in use");
  }

  if (data.password !== data.confirmPassword) {
    throw createError(400, "Password and confirmation do not match");
  }

  if (!data.password) {
    throw createError(400, "Password is required");
  }

  const passwordHash = await encryption.encrypt(data.password);

  data.password = passwordHash;
  delete data.confirmPassword;

  const newUser = await User.create(data);
  return newUser;
}

async function create(data) {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw createError(409, "Email already in use");
  }
  const newUser = await User.create(data);
  return newUser;
}

async function login(data) {
  const user = await User.findOne({ email: data.email }).select("+password");
  if (!user) {
    throw createError(401, "Invalid email or password");
  }

  const isPasswordValid = await encryption.compare(
    data.password,
    user.password
  );

  if (!isPasswordValid) {
    throw createError(401, "Invalid email or password");
  }

  const token = jwt.sign({ id: user._id }, "jrdfgdsfsdf");

  return token;
}

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

module.exports = { create, login, getById, deleteById, signUp };
