const express = require('express');
const router = express.Router();

const EcController = require('../controllers/EcController');

router.post('/ec', EcController.addEc);

router.get('/ecs', EcController.retrieveEc);

module.exports = router;