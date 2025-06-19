/**
 * Github
 */

const dotenv = require('dotenv').config()

const users = require('../services/user_service')

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log('GitHub profile:', profile);

    let user = users.find( u => u.github?.id === profile.id || u.email === profile.emails[0]?.value );

    if (!user) {
      user = {
        id: users.length + 1,
        email: profile.emails[0]?.value,
        roles: ['viewer'],
        github: {
          id: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          avatar: profile.photos[0],
        }
      };
      users.push(user);
    }
    else {
      user.github = {
          id: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          avatar: profile.photos[0],
        }
    }

    return done(null, user);
  }

));