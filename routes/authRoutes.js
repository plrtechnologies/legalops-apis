const express = require('express');
const router = express.Router();
const { signup, login, getUserProfile } = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected route
router.get('/profile', authenticate, getUserProfile);

module.exports = router;
