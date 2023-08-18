// auth.js
const requireAuth = (req, res, next) => {
    if (req.session && req.session.user) {
      // User is authenticated, check for required permissions
      if (req.session.user.isAdmin) {
        // User is an admin, proceed to the next middleware
        next();
      } else {
        // User is not an admin, send a response with an error message
        res.status(403).send('Forbidden. Access denied.');
      }
    } else {
      // User is not authenticated, send a response with an error message
      res.status(401).send('Unauthorized. Please log in.');
    }
  };
  
  module.exports = {
    requireAuth
  };
  