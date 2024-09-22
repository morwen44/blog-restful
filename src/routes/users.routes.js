const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const usersCases = require("../usecases/users.usecases");
const auth = require("../middlewares/auth");

router.get("/me", auth, async (req, res) => {
  try {
    const user = req.user;
    console.log("be"+user);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
});

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


router.post("/signup", async (req, res) => {
  try {
    const newUser = await usersCases.signUp(req.body);
    res
      .status(201)
      .json({ success: true, message: "User created", data: newUser });
  } catch (error) {
    console.error("Sign up error:", error.message);

    let errorMessage;
    if (error.status === 409) {
      errorMessage = error.message.includes("Email")
        ? "Email already in use"
        : "Username already in use";
    } else {
      errorMessage = error.message || "An unexpected error occurred";
    }

    res.status(error.status || 500).json({
      success: false,
      message: errorMessage,
    });
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
    const data = req.body;
    const token = await usersCases.login(data);
    res.json({ success: true, message: "Logged in", data: { token } });
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
