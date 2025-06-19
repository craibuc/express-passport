const ensureAuthenticated = (req, res, next) => {
  console.log('ensureAuthenticated')

  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/session/new');

}

const isAuthorized = (role) => (req, res, next) => {
  console.log('isAuthorized')

  if (req.isAuthenticated() && req.user.roles.includes(role)) {
    return next();
  } 
  else {
    res.status(403).render('403', {
      title: 'Forbidden [403]',
      url: req.originalUrl
    });
  }

};

module.exports = { ensureAuthenticated, isAuthorized };