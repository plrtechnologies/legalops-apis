const express = require('express');
const router = express.Router();

// Import the controller
const sessionController = require('../controllers/sessionController');

//POST  For fresh document creation
router.post('/create-session', sessionController.createSession);


//GET- resume session by email
router.get('/session/resume-by-email', sessionController.resumeSessionByEmail);

// GET - Resume session by loanproposername
router.get('/session/resume-session', sessionController.resumeSession);

// GET route to retrieve session data by session_id (passed as a URL param)
router.get('/session/:session_id', sessionController.getSession);



module.exports = router;
