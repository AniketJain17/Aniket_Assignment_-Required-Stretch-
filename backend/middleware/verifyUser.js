const jwt = require('jsonwebtoken');

const verifyUserMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization;

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token provided' });
    }
    req.user = { _id: decoded.userId };
    next();
  });
};

module.exports = verifyUserMiddleware;
