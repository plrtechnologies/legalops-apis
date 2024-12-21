const express = require('express');
const router = express.Router();

const MortgageDeedController = require('../controllers/MortgageDeedController');

router.post('/mortgage-deed', MortgageDeedController.addMortgageDeed);

router.get('/mortgage-deeds', MortgageDeedController.retrieveMortgageDeed);

module.exports = router;