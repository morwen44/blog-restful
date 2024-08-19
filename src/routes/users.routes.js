const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const usersCases = require("../usecases/users.usecases");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersCases.getById(id);
    console.log(user);
    if (!user) {
      throw createError(404, "User not found");
    }
    res.status(200).json({ success: true, message: "User found", data: user });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await usersCases.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "User created", data: newUser });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await usersCases.login(email, password);
    if (!token) {
      throw createError(401, "Invalid email or password");
    }
    res.json({ success: true, message: "Logged in", data: token });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await usersCases.deleteById(id);
    res.json({ success: true, message: "User deleted", data: deletedUser });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
});

module.exports = router;
