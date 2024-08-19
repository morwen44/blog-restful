const createError = require("http-errors");
const usersCases = require("../usecases/users.usecases");

async function auth(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  try {
    if (!token) {
      throw createError(401, "Token is required in authorization header");
    }
    const payload = jwt.verify(token);
    const user = await usersCases.findById(payload._id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(error.status || 401).json({ message: "Invalid token" });
  }
}

module.exports = auth;