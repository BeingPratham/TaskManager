const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY || 'default_secret_key';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
