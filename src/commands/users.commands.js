const getArg = require("../lib/getArgValue");
const usersCase = require("../usecases/users.usecases");

async function add() {
  const name = getArg("name");
  const profilePic = getArg("profilePic");
  const email = getArg("email");
  const password = getArg("password");
  const createdAt = new Date();
  const updatedAt = new Date();
  const newUser = await usersCase.create({
    name,
    profilePic,
    email,
    password,
    createdAt,
    updatedAt,
  });
  console.log("User created: ", newUser);
}

async function find() {}

async function login() {}

async function rm() {
  const id = getArg("id");
  const deletedUser = await usersCase.deleteById(id);
  console.log("User deleted: ", deletedUser);
}

module.exports = { add, find, login, rm };
