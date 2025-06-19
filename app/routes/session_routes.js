const passport = require('passport')

const router = require('express').Router();
router
  .get('/new', (req, res) => {
    console.log('GET /session/new')

    const errors = req.flash ? req.flash('error') : null;
    console.log('errors',errors)

    res.render('session/new',{ 
      title: 'Authenticate', 
      username: req.user?.email,
      errors: errors
    });

  })

  .post('/new', (req, res, next) => {
    console.log('POST /session/new');

    passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/session/new',
      failureFlash: true
    })(req, res, next);

  })

  .get('/delete', (req, res, next) => {

    req.logout(err => {
      if (err) return next(err);

      req.session.destroy(() => {
        res.redirect('/session/new');
      });

    });

  });

module.exports = router;