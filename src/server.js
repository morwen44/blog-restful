const express = require("express");
const app = express();
const postsRouter = require("./routes/posts.routes");
const usersRouter = require("./routes/users.routes");

app.use(express.json());
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Blog API" });
});

module.exports = app;
