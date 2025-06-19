/**
 * Local
 * 
 */

const users = require('../services/user_service')

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username, password, done) => {
    console.log('LocalStrategy')

    const user = users.find(u => u.email === username);

    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    if (user.inactive === true) {
      return done(null, false, { message: 'Account locked.' });
    }

    return done(null, user);

  }

));
