const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = req.originalUrl.includes('/backend')
      ? process.env.JWT_SECRET_BACKEND
      : process.env.JWT_SECRET_FRONTEND;

    const decoded = jwt.verify(token, secret);
    req.user = decoded; // ✅ includes userId from payload

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
