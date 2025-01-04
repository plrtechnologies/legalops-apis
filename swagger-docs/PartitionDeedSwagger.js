/**
 * @swagger
 * /api/partition-deed:
 *   post:
 *     summary: Add a new partitionDeed
 *     tags:
 *       - partitionDeed
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object  
 *             properties:
 *                  session_id:
 *                      type: string 
 *                  DocType:
 *                      type: string 
 *                  PartitionerName:
 *                      type: string
 *                  RecipientName:
 *                      type: string       
 *                  RegistrationDate:
 *                      type: string
 *                  DocNumber:
 *                      type: string
 *                  IssuingAuthority:
 *                      type: string           
 *     responses:
 *       200:
 *         description: Successfully added partitionDeed.
 *       500:
 *         description: Error adding partitionDeed.
 */
/**
 * @swagger
 * /api/partition-deeds:
 *   get:
 *     summary: Retrieve all partitionDeeds
 *     tags:
 *       - partitionDeed
 *     responses:
 *       200:
 *         description: List of partitionDeeds.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   session_id:
 *                     type: string
 *                   DocType:
 *                     type: string
 *                   PartitionerName:
 *                     type: string
 *                   RecipientName:
 *                     type: string
 *                   RegistrationDate:
 *                     type: string
 *                   DocNumber:
 *                     type: string
 *                   IssuingAuthority:
 *                     type: string
 *       500:
 *         description: Error retrieving partitionDeeds.
 */
module.exports=app;