require("dotenv").config();
const server = require("./src/server");
const db = require("./src/lib/db");
const port = 8080;

db.connect()
  .then(() => {
    console.log("Connected to DB");
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
 
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
    process.exit(1);
  });
