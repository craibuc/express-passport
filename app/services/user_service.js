const users = [
  { id: 1, email: 'admin@domain.tld', password: 'password', roles: ['viewer','administrator'], inactive: false },
  { id: 2, email: 'first.last@domain.tld', password: 'password', roles: ['viewer'], inactive: false },
  { id: 3, email: 'foo.bar@domain.tld', password: 'password', roles: ['viewer'], inactive: true },
];

module.exports = users;
