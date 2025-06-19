const users = require('../services/user_service')

require('./passport.strategy.local')
require('./passport.strategy.github')

const passport = require('passport');

passport.serializeUser((user, done) => {
  console.log('serializeUser',user)

  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(`deserializeUser (${id})`)

  const user = users.find(u => u.id === id);

  done(null, user);
});
