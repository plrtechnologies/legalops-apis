const express = require('express');
const router = express.Router();
const linkdocController = require('../controllers/linkdocController');
const authenticate = require('../middleware/authenticate');

// ✅ Apply only authentication (no role checks) to all routes
router.use(authenticate);

router.post('/create-linkdoc', linkdocController.addLinkDocument);
router.get('/doc-user_id', linkdocController.getLinkDocsByUserId);
router.get('/doc-loanproposername', linkdocController.getLinkDocsByName);
router.get('/doc-session_id', linkdocController.getLinkDocsByID);

module.exports = router;
