const express = require('express');
const router = express.Router();

// Controller
const linkDocumentController = require('../controllers/linkdocController');

// Routes
router.post('/link_documents', linkDocumentController.addlinkDocument);
router.get('/link_documents/:session_id', linkDocumentController.getlinkDocument);

module.exports = router;
