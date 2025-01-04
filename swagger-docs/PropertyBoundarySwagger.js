/**
 * @swagger
 * /property-boundary:
 *   post:
 *     summary: Add a new property boundary
 *     tags: 
 *         - Property Boundary
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
 *      500:
 *         description:Error adding Property Boundary
 */
module.exports=app;
