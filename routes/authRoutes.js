const express = require('express');
const router = express.Router();
const { signup, login, getUserProfile } = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');

// POST signup
router.post(
  '/signup',
  signup
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Register a new user'
     #swagger.parameters['body'] = {
          in: 'body',
          description: 'User details',
          required: true,
          schema: { name: 'any', email: 'any', password: 'any' }
     }
     #swagger.responses[201] = { description: 'User created successfully' }
  */
);

// POST login
router.post(
  '/login',
  login
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Login user and return JWT token'
     #swagger.parameters['body'] = {
          in: 'body',
          description: 'Login credentials',
          required: true,
          schema: { email: 'any', password: 'any' }
     }
     #swagger.responses[200] = { description: 'Login successful' }
  */
);

// GET profile
router.get(
  '/profile',
  authenticate,
  getUserProfile
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Get logged-in user profile'
     #swagger.security = [{ "bearerAuth": [] }]
  */
);

module.exports = router;
