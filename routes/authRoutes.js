const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Signup Route
router.post('/signup', authController.signup);

// Login Route
router.post('/login', authController.login);

// Get User Profile (Session-based)
router.get('/profile', authController.getUserProfile);

module.exports = router;
