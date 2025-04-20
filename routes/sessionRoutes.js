const express = require('express');
const router = express.Router();

// Import the controller
const sessionController = require('../controllers/sessionController');

// POST route to create or update a session
router.post('/session', sessionController.addSession);

// GET route to retrieve session data by session_id (passed as a URL param)
router.get('/session/:session_id', sessionController.getSession);

module.exports = router;
