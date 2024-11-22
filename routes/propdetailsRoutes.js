const express = require('express');
const router = express.Router();
const propdetailsController = require('../controllers/propdetailsController');

router.post('/prop-detail', propdetailsController.addPropDetail);
router.get('/prop-details', propdetailsController.retrievePropDetails);

module.exports = router;
