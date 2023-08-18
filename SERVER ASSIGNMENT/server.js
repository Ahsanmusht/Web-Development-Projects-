const express = require('express');
const session = require('express-session');
const app = express();
const UserRouter = require('./Routes/User.Routes');
// const isAuthenticated = require('./Middleware/auth'); // Import the authentication middleware

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use('/', UserRouter);

// Middleware for handling unmatched routes
app.use((req, res, next) => {
  res.status(404).send('404 Not Found.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
