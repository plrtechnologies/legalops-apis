const express = require('express');
const router = express.Router();

const RelinquishDeedController = require('../controllers/RelinquishDeedController');

router.post('/relinquish-deed', RelinquishDeedController.addRelinquishDeed);

router.get('/relinquish-deeds',RelinquishDeedController.retrieveRelinquishDeed);

module.exports = router;