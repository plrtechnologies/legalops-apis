const express = require('express');
const router = express.Router();
const combinedSessionController = require('../controllers/combinedSessionController');
const authenticate = require('../middleware/authenticate');

// ✅ Apply only authentication (no role checks) to all routes
router.use(authenticate);

router.get('/resumesession/:user_id', combinedSessionController.resumeFullSessionByUserId);

module.exports = router;
