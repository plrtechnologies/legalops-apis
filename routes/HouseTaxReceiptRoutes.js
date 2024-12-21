const express = require('express');
const router = express.Router();

const HouseTaxReceiptController = require('../controllers/HouseTaxReceiptController');

router.post('/housetax-receipt', HouseTaxReceiptController.addHouseTaxReceipt);

router.get('/housetax-receipts', HouseTaxReceiptController.retrieveHouseTaxReceipt);

module.exports = router;