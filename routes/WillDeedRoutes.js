const express = require('express');
const router = express.Router();

const WillDeedController = require('../controllers/WillDeedController');

router.post('/will-deed', WillDeedController.addWillDeed);

router.get('/will-deeds', WillDeedController.retrieveWillDeed);

module.exports = router;