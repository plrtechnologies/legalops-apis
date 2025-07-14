const express = require('express');
const router = express.Router();
const combinedSessionController = require('../controllers/combinedSessionController');

router.get('/resume-full-session/:email',combinedSessionController. resumeFullSessionByEmail);

module.exports = router;