const express = require('express');
const router = express.Router();
const PropertyBoundaryController = require('../controllers/PropertyBoundaryController');

router.post('/property-boundary', PropertyBoundaryController.addPropertyBoundary);
router.get('/property-boundaries', PropertyBoundaryController.retrivePropertyBoundaries);

module.exports = router;
