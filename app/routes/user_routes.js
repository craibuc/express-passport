const users = require('../services/user_service')

const { ensureAuthenticated, isAuthorized } = require('./helper')

const router = require('express').Router();
router

  .get('/', ensureAuthenticated, isAuthorized('administrator'), (req,res) => {
    console.log('GET /users')
    
    res.render('users/index', { 
      title: 'Users', 
      users: users,
    });

  })

  .get('/:id/edit', ensureAuthenticated, isAuthorized('administrator'), (req, res) => {
    console.log(`GET /users/${req.params.id}/edit`);

    const { id } = req.params;
    const user = users.find(u => u.id === Number(id));

    if (!user) {
      return res.status(404).render('404', { title: 'User not found', url: req.originalUrl });
    }

    res.render('users/edit', { 
      title: 'Users - Edit',
      user: user,
    });

  })

  .post('/:id/edit', ensureAuthenticated, isAuthorized('administrator'), (req, res) => {
    console.log(`POST /users/${req.params.id}/edit`);

    const { id } = req.params;
    const { email, roles, inactive } = req.body.user;

    let user = users.find(u => u.id === Number(id));

    if (!user) {
      return res.status(404).render('404', { title: 'User not found', url: req.originalUrl });
    }

    user.email = email || user.email;
    user.roles = Array.isArray(roles) ? roles : (roles ? [roles] : user.roles);
    user.inactive = Number(inactive) === 1;

    res.redirect(`/users/${user.id}/edit`);

  });

module.exports = router;  