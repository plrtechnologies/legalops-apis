const express = require('express');
const router = express.Router();
const linkdocController = require('../controllers/linkdocController');
const authenticate = require('../middleware/authenticate');
const requireRole = require('../middleware/requireRole');

// ✅ Apply backend protection to all routes in this file
router.use(authenticate, requireRole('backend'));

router.post('/create-linkdoc', linkdocController.addLinkDocument);
router.get('/doc-user_id', linkdocController.getLinkDocsByUserId);
router.get('/doc-loanproposername', linkdocController.getLinkDocsByName);
router.get('/doc-session_id', linkdocController.getLinkDocsByID);

module.exports = router;
