const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const authenticate = require('../middleware/authenticate');
const requireRole = require('../middleware/requireRole');

// ✅ Apply backend protection to all routes in this file
router.use(authenticate, requireRole('backend'));

router.post('/create-session', sessionController.createSession);
router.get('/user_id', sessionController.getSessionByUserId);
router.get('/loanproposername', sessionController.getSessionByName);
router.get('/session_id', sessionController.getSessionByID);

module.exports = router;
