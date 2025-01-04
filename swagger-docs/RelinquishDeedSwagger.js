
/**
 * @swagger
 * /relinquish-deed:
 *   post:
 *     summary: Add a new Relinquish Deed
 *     tags:
 *       - Relinquish Deed
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
 *                  RelinquisherName:
 *                      type: string
 *                  RecipientName:
 *                      type: string       
 *                  RegistrationDate:
 *                      type: string
 *                  DocNumber:
 *                      type: string
 *                  IssuigAuthority:
 *                      type: string           
 *     responses:
 *       200:
 *         description: Successfully added Relinquish Deed.
 *       500:
 *         description: Error adding Relinquish Deed.
 */
/**
 * @swagger
 * /relinquish-deeds:
 *   get:
 *     summary: Retrieve all Relinquish Deeds
 *     tags:
 *       - Relinquish Deeds
 *     responses:
 *       200:
 *         description: List of Relinquish Deeds.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error retrieving Relinquish Deeds.
 */

module.exports=app;