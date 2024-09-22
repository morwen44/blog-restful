const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const postsRouter = require("./routes/posts.routes");
const usersRouter = require("./routes/users.routes");
require('dotenv').config();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Blog API" });
});

module.exports = app;
