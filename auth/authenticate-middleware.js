// /*
//   complete the middleware code to check if the user is logged in
//   before granting access to the next middleware/route handler
// */

// module.exports = (req, res, next) => {
//   res.status(401).json({ you: 'shall not pass!' });
// };
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const secret = process.env.JWT_SECRET || "it is secret, is it safe?";

    jwt.verify(authorization, secret, function(err, decodedToken) {
      if (err) {
        res.status(401).json({ message: "invalid Token" });
      } else {
        req.user = { department: decodedToken.department };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please Login and try again" });
  }
};
