const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');
const setClientType = require('../middleware/clientType');
const requireRole = require('../middleware/requireRole');

router.post('/signup', setClientType('frontend'), authController.signup);
router.post('/login', setClientType('frontend'), authController.login);

// ✅ Protect frontend profile with correct role
router.get('/profile', authenticate, requireRole('frontend'), authController.getUserProfile);

module.exports = router;
