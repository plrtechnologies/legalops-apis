const express = require('express');
const router = express.Router();
const combinedSessionController = require('../controllers/combinedSessionController');
const authenticate = require('../middleware/authenticate');

router.use(authenticate);

// GET resume session
router.get(
  '/resumesession/:user_id',
  combinedSessionController.resumeFullSessionByUserId
  /* #swagger.tags = ['CombinedSession']
     #swagger.summary = 'Resume a full session by user ID'
     #swagger.parameters['user_id'] = { in: 'path', type: 'string', required: true }
     #swagger.security = [{ "bearerAuth": [] }]
  */
);

module.exports = router;
