const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate'); // JWT authentication middleware

// Signup Route
router.post('/signup', authController.signup);

// Login Route
router.post('/login', authController.login);

// Get User Profile (JWT Authentication)
router.get('/profile', authenticate, authController.getUserProfile);

module.exports = router;
