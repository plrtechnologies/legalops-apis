const express = require('express');
const router = express.Router();
const combinedSessionController = require('../controllers/combinedSessionController');
const authenticate = require('../middleware/authenticate');
const requireRole = require('../middleware/requireRole');

// ✅ Apply backend protection to all routes in this file
router.use(authenticate, requireRole('backend'));

router.get('/resumesession/:user_id', combinedSessionController.resumeFullSessionByUserId);


module.exports = router;
