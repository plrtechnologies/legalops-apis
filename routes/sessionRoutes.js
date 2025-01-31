const express = require('express');
const router = express.Router();

// Import the controller
const sessionController = require('../controllers/sessionController');

// Define the POST route that will be used for all types of data
router.post('/session', sessionController.addSession);


// GET route to retrieve all session data
router.get('/session', sessionController.getSessionData);

module.exports = router;
