const passport = require('passport');

// Register strategies
require('./strategy.local');
// require('./strategy.azure-ad');
require('./strategy.github');

// Register serialization
require('./serialize.js');

// so app.js can require this
module.exports = passport;
