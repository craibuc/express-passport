if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();

// body parser middleware for form data
app.use(express.urlencoded({ extended: true }));

// store data in session
const session = require('express-session');
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// flash messages
const flash = require('connect-flash');
app.use(flash());

/**
 * Passport
 */

require('./app/config/passport.config')

const passport = require('passport');

// initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ensure currentUser is available to all route handlers
app.use((req, res, next) => {

  res.locals.currentUser = req.user;
  res.locals.path = req.path;

  next();
});

// views
var path = require('path');
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

// routes
app.get('/', (req, res) => {
  console.log('GET /')

  res.render('home', { 
    title: 'Home',
    currentUser: req.user
  });

});

app.get('/profile', (req, res) => {
  console.log('GET /profile')

  if (req.isAuthenticated()) {
          
    res.render('profile', { 
      title: 'Profile',
    });

  }
  else {
    res.redirect('/session/new');
  }

});

app
  .use('/session', require('./app/routes/session_routes'))
  .use('/auth/github', require('./app/routes/oauth_github_routes'))
  .use('/users', require('./app/routes/user_routes'))

// Server Error [500]
app.use((err, req, res, next) => {
  console.error(err.stack); // Log it for debugging

  res.status(500).render('500', {
    title: 'Server Error',
    error: err
  });

});

// Not Found [404] - must be the last route
app.use((req, res, next) => {

  res.status(404).render('404', { 
    title: 'Page Not Found',
    url: req.originalUrl
  });

});

const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});