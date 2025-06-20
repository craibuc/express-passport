/**
 * Github routes
 */

const passport = require('passport')

const router = require('express').Router();
router
  .get('/',
    passport.authenticate('github', { scope: [ 'read:user' ] })
  )
  .get('/callback',
    passport.authenticate('github', {
      failureRedirect: '/session/new',
      failureFlash: true
    }),
    function(req, res) {
      // on successful authentication
      res.redirect('/profile');
    });

module.exports = router;