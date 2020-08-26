const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {

  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Access denied. No token provided."
    });
  }

  jwt.verify(token, config.get("jwtPrivateKey"), (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: "Invalid token."
      });
    } else {
      next();
    }
  });
}

const token = (email_id) => {
  const token = jwt.sign({ email_id }, config.get("jwtPrivateKey"), {
    expiresIn: 60 * 60
  });
  return token;
}

module.exports = {
  auth,
  token
}