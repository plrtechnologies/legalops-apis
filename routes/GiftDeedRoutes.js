const express = require('express');
const router = express.Router();

const GiftDeedController = require('../controllers/GiftDeedController');

router.post('/gift-deed', GiftDeedController.addGiftDeed);

router.get('/gift-deeds',GiftDeedController.retrieveGiftDeed);

module.exports = router;