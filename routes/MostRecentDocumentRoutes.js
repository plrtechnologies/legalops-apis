const express = require('express');
const router = express.Router();
const MostRecentDocumentController = require('../controllers/MostRecentDocumentController');

router.post('/MostRecent-Document', MostRecentDocumentController.addMostRecentDocument);
router.get('/MostRecent-Documents', MostRecentDocumentController.retriveMostRecentDocuments);

module.exports = router;


