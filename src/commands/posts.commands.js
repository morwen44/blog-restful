const getArg = require("../lib/getArgValue");
const postsCase = require("../usecases/posts.usecases");
async function add() {
  const title = getArg("title");
  const image = getArg("image");
  const body = getArg("content");
  // const user = objectID(u)
  const createdAt = new Date();
  const updatedAt = new Date();
  const newPost = await postsCase.create({
    title,
    image,
    body,
    createdAt,
    updatedAt,
  });
  console.log("Post created: ", newPost);
}

async function ls() {
  const posts = await postsCase.getAll();
  console.log(posts);
}

async function edit() {}

async function rm() {
    const id = getArg("id");
    const deletedPost = await postsCase.deleteById(id);
    console.log("Post deleted: ", deletedPost);
}

module.exports = { add, ls, edit, rm };
