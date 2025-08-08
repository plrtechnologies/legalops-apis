const requireRole = (expectedRole) => (req, res, next) => {
    if (!req.user || req.user.role !== expectedRole) {
      return res.status(403).json({ error: 'Access denied: Role mismatch' });
    }
    next();
  };
  
  module.exports = requireRole;
  