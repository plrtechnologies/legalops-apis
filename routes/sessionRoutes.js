const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const authenticate = require('../middleware/authenticate');

// ✅ Apply only authentication to all routes
router.use(authenticate);

router.post('/create-session', sessionController.createSession);
router.get('/user_id', sessionController.getSessionByUserId);
router.get('/loanproposername', sessionController.getSessionByName);
router.get('/session_id', sessionController.getSessionByID);

module.exports = router;
