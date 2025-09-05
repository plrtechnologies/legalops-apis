const express = require('express');
const router = express.Router();
const linkdocController = require('../controllers/linkdocController');

router.post('/linkdoc/session', linkdocController.addLinkDocument);
router.get('/linkdoc/resume-by-email', linkdocController.resumeLinkSessionsByEmail);
router.get('/linkdoc/search-by-loanproposer', linkdocController.getLinkDocsByName);
router.get('/linkdoc/:session_id', linkdocController.getLinkDocument);






module.exports = router;
