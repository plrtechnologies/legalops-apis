const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');
const setClientType = require('../middleware/clientType');
const requireRole = require('../middleware/requireRole');

router.post('/signup', setClientType('backend'), authController.signup);
router.post('/login', setClientType('backend'), authController.login);

// ✅ Protect backend profile with both authenticate AND role check
router.get('/profile', authenticate, requireRole('backend'), authController.getUserProfile);


module.exports = router;
