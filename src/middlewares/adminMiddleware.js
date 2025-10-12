function adminMiddleware(req, res, next) {
  console.log('User from token:', req.user);
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin only.' });
  }
  next();
}

module.exports = adminMiddleware;
