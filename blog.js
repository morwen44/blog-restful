//CLI
//allow to organize the code in a modular way
//- user
//  - add (users add --name=[name] --email=[email] --password=[password])
//  - ls (users ls --id=[id])
//  - login (users login --email=[email] --password=[password])
//- post
//  - add (post add --title=[title] --content=[content])
//  - ls (post ls --search=[search])
//  - edit (post edit --id=[id] --title=[title] --content=[content])
//  - rm (post rm --id=[id])

const db = require("./src/lib/db");
const resource = process.argv[2];
const action = process.argv[3];
const userActions = require("./src/commands/users.commands");
const postActions = require("./src/commands/posts.commands");

const allowedActions = {
  users: userActions,
  posts: postActions,
};

db.connect()
  .then(async () => {
    console.log("Connected to DB");

    const resourceActions = allowedActions[resource];
    if (!resourceActions) {
      console.log("Resource not found");
      process.exit(2);
    }

    const actionToExecute = resourceActions[action];
    if (!actionToExecute) {
      console.log("Action not found");
      process.exit(3);
    }
    await actionToExecute();
    process.exit(0);
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
    process.exit(1);
  });
