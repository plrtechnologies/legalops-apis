const express = require('express');
const router = express.Router();

const PartitionDeedController = require('../controllers/PartitionDeedController');

router.post('/partition-deed', PartitionDeedController.addPartitionDeed);

router.get('/partition-deeds', PartitionDeedController.retrievePartitionDeed);

module.exports = router;