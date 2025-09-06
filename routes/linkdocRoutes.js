const express = require('express');
const router = express.Router();
const linkdocController = require('../controllers/linkdocController');
const authenticate = require('../middleware/authenticate');

router.use(authenticate);

// POST create linkdoc
router.post(
  '/create-linkdoc',
  linkdocController.addLinkDocument
  /* #swagger.tags = ['LinkDoc']
     #swagger.summary = 'Create a new link document'
     #swagger.security = [{ "bearerAuth": [] }]
  */
);

// GET by user_id
router.get(
  '/doc-user_id',
  linkdocController.getLinkDocsByUserId
  /* #swagger.tags = ['LinkDoc']
     #swagger.summary = 'Get link documents by user ID'
     #swagger.parameters['user_id'] = { in: 'query', type: 'string', required: true }
     #swagger.security = [{ "bearerAuth": [] }]
  */
);

// GET by loan proposer name
router.get(
  '/doc-loanproposername',
  linkdocController.getLinkDocsByName
  /* #swagger.tags = ['LinkDoc']
     #swagger.summary = 'Get link documents by loan proposer name'
     #swagger.parameters['name'] = { in: 'query', type: 'string', required: true }
     #swagger.security = [{ "bearerAuth": [] }]
  */
);

// GET by session_id
router.get(
  '/doc-session_id',
  linkdocController.getLinkDocsByID
  /* #swagger.tags = ['LinkDoc']
     #swagger.summary = 'Get link documents by session ID'
     #swagger.security = [{ "bearerAuth": [] }]
  */
);

module.exports = router;
