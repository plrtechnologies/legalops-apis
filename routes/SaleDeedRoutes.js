const express = require('express');
const router = express.Router();

const SaleDeedController = require('../controllers/SaleDeedController');

router.post('/sale-deed', SaleDeedController.addSaleDeed);

router.get('/sale-deeds',SaleDeedController.retrieveSaleDeed);

module.exports = router;