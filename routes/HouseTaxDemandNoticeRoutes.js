const express = require('express');
const router = express.Router();

const HouseTaxDemandNoticeController = require('../controllers/HouseTaxDemandNoticeController');

router.post('/housetaxdemand-notice', HouseTaxDemandNoticeController.addHouseTaxDemandNotice);

router.get('/housetaxdemand-notices', HouseTaxDemandNoticeController.retrieveHouseTaxDemandNotice);

module.exports = router;