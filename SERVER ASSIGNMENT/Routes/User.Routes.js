const express = require('express');
const UserRouter = express.Router();
const { requireAuth } = require('./Middleware/auth.js'); // Import the authentication middleware

// Public routes
UserRouter.get('/', (req, res) => {
  res.send('Welcome to the Assignment!');
});

UserRouter.get('/about', (req, res) => {
  res.send('This is the About Page.');
});

UserRouter.get('/contact', (req, res) => {
  res.send('Contact us at ahsanmushtaq901@gmail.com.');
});

// Protected routes
UserRouter.get('/admin', requireAuth, (req, res) => {
  res.send('Admin Dashboard');
});

UserRouter.get('/profile', requireAuth, (req, res) => {
  res.send('User Profile');
});

module.exports = UserRouter;
