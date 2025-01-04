/**
 * @swagger
 * /api/MostRecent-Document:
 *   post:
 *     summary: Add a new MostRecentDocument
 *     tags:
 *       - MostRecentDocument
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object  
 *             properties:
 *               session_id:
 *                 type: string
 *               selectDeedType:
 *                 type: string
 *               dateofRegistration:
 *                 type: string
 *               documentNumber:
 *                 type: string
 *               nameofSubregistrarOffice:
 *                 type: string
 *               locationOfSubregistrarOffice:
 *                 type: string
 *               subregistrarOfficeMandal:
 *                 type: string
 *               subregistrarOfficeDistrict:
 *                 type: string
 *               subregistrarOfficeLocalAuthority:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully added MostRecentDocument.
 *       500:
 *         description: Error adding MostRecentDocument.
 */
/**
 * @swagger
 * /api/MostRecent-Documents:
 *   get:
 *     summary: Retrieve all MostRecentDocuments
 *     tags:
 *       - MostRecentDocument
 *     responses:
 *       200:
 *         description: List of MostRecentDocuments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   session_id:
 *                     type: string
 *                   selectDeedType:
 *                     type: string
 *                   dateofRegistration:
 *                     type: string
 *                   documentNumber:
 *                     type: string
 *                   nameofSubregistrarOffice:
 *                     type: string
 *                   locationOfSubregistrarOffice:
 *                     type: string
 *                   subregistrarOfficeMandal:
 *                     type: string
 *                   subregistrarOfficeDistrict:
 *                     type: string
 *                   subregistrarOfficeLocalAuthority:
 *                     type: string
 *       500:
 *         description: Error retrieving MostRecentDocuments.
 */
module.exports=app;