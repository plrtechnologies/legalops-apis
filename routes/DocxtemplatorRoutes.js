const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const {
  getAllSessions,
  generatePdfBySessionId
} = require('../Docxtemplater/Docxtemplater');

router.use(authenticate);

// GET all sessions
router.get(
  '/sessions',
  getAllSessions
  /* #swagger.tags = ['Docxtemplator']
     #swagger.summary = 'Get all sessions'
     #swagger.security = [{ "bearerAuth": [] }]
  */
);

// GET generate PDF by sessionId
router.get(
  '/generate-pdf/:sessionId',
  generatePdfBySessionId
  /* #swagger.tags = ['Docxtemplator']
     #swagger.summary = 'Generate a PDF for a given session ID'
     #swagger.parameters['sessionId'] = { in: 'path', type: 'string', required: true }
     #swagger.security = [{ "bearerAuth": [] }]
  */
);

module.exports = router;
