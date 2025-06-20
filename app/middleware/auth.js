module.exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};

module.exports.requireRole = role => {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.roles.includes(role)) {
      return next();
    }
    res.status(403).render('403', { url: req.originalUrl });
  };
};
