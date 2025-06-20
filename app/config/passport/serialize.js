const passport = require('passport');
const users = require('../../services/user_service')

// hook to serialize in-memory user to session cookie
passport.serializeUser(function(user, done) {
  console.log('serializeUser', user);

  done(null, user.id);
});

// hook to deserialize session cookie to in-memory user (pulled from mongo)
passport.deserializeUser(function(id, done) {
  console.log(`deserializeUser (${id})`)

  const user = users.find(u => u.id === id);
  done(null, user);

});
