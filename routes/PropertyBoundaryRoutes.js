const express = require('express');
const router = express.Router();
const PropertyBoundaryController = require('../controllers/PropertyBoundaryController');


/**
 * @swagger
 * /property-boundary:
 *   post:
 *     summary: Add a new property boundary
 *     tags: [Property Boundary]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               session_id:
 *                 type: string
 *               eastBoundrytype:
 *                 type: string
 *               eastBoundryExtent:
 *                 type: string
 *               eastBoundryOwner:
 *                 type: string
 *               westBoundrytype:
 *                 type: string
 *               westBoundryExtent:
 *                 type: string
 *               westBoundryOwner:
 *                 type: string
 *               northBoundrytype:
 *                 type: string
 *               northBoundryExtent:
 *                 type: string
 *               northBoundryOwner:
 *                 type: string
 *               southBoundrytype:
 *                 type: string
 *               southBoundryExtent:
 *                 type: string
 *               southBoundryOwner:
 *                 type: string
 *     responses:
 *       200:
 *         description: Property boundary added successfully
 *       500:
 *         description: Error adding property boundary
 */
router.post('/property-boundary', PropertyBoundaryController.addPropertyBoundary);
/**
 * @swagger
 * /property-boundaries:
 *   get:
 *     summary: Retrieve all property boundaries
 *     tags: [Property Boundary]
 *     responses:
 *       200:
 *         description: A list of property boundaries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error retrieving property boundaries
 */
router.get('/property-boundaries', PropertyBoundaryController.retrivePropertyBoundaries);

module.exports = router;
