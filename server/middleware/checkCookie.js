const jwt = require("jsonwebtoken");

const checkCookie = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    const error = new Error("User not authorized");
    error.statusCode = 500;
    return next(error);
  }
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = checkCookie;
