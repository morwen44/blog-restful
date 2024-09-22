const createError = require("http-errors");
const usersCases = require("../usecases/users.usecases");
const jwt = require("../lib/jwt");

async function auth(req, res, next) {
  console.log("auth middleware");
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  console.log(token);
  try {
    if (!token) {
      throw createError(401, "Token is required in authorization header");
    }
    const payload = jwt.verify(token);
    console.log(JSON.stringify(payload));
    console.log(payload.id);
    const user = await usersCases.getById(payload.id);
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    return res.status(error.status || 401).json({ message: "Invalid token" });
  }
}

module.exports = auth;
