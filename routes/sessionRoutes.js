const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const authenticate = require('../middleware/authenticate');

router.use(authenticate);

// POST create-session
router.post(
  '/create-session',
  sessionController.createSession
  /* #swagger.tags = ['Session']
     #swagger.summary = 'Create a new session'
     #swagger.security = [{ "bearerAuth": [] }]
  */
);

// GET by user_id
router.get(
  '/user/:user_id',
  sessionController.getSessionByUserId
  /* #swagger.tags = ['Session']
     #swagger.summary = 'Get session by user ID'
     #swagger.parameters['user_id'] = { in: 'query', type: 'string', required: true }
     #swagger.security = [{ "bearerAuth": [] }]
  */
);

// GET by loan proposer name
router.get(
  '/loanproposername',
  sessionController.getSessionByName
  /* #swagger.tags = ['Session']
     #swagger.summary = 'Get session by loan proposer name'
     #swagger.parameters['name'] = { in: 'query', type: 'string', required: true }
     #swagger.security = [{ "bearerAuth": [] }]
  */
);

// GET by session_id
router.get(
  '/id/:session_id',
  sessionController.getSessionByID
  /* #swagger.tags = ['Session']
     #swagger.summary = 'Get session by session ID'
     #swagger.security = [{ "bearerAuth": [] }]
  */
);

module.exports = router;
