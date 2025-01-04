/**
 * @swagger
 * /prop-detail:
 *   post:
 *     summary: Add a new propdetail
 *     tags:
 *       - propdetail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object  
 *             properties:
 *               session_id:
 *                 type: string 
 *               propertyDoorNumber:
 *                 type: string 
 *               nearbyDoor:
 *                 type: string
 *               propertyAssessmentNumber:
 *                 type: string       
 *               propertySurveyNumber:
 *                 type: string
 *               ExtentOfProperty:
 *                 type: string
 *               propertyType:
 *                 type: string           
 *               propertyNature:
 *                 type: string           
 *     responses:
 *       200:
 *         description: Successfully added propdetail.
 *       500:
 *         description: Error adding propdetail.
 */
/**
 * @swagger
 * /prop-details:
 *   get:
 *     summary: Retrieve all propdetail
 *     tags:
 *       - propdetail
 *     responses:
 *       200:
 *         description: List of propdetails.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   session_id:
 *                     type: string 
 *                   propertyDoorNumber:
 *                     type: string 
 *                   nearbyDoor:
 *                     type: string
 *                   propertyAssessmentNumber:
 *                     type: string       
 *                   propertySurveyNumber:
 *                     type: string
 *                   ExtentOfProperty:
 *                     type: string
 *                   propertyType:
 *                     type: string           
 *                   propertyNature:
 *                     type: string           
 *       500:
 *         description: Error retrieving propdetails.
 */
module.exports=app;