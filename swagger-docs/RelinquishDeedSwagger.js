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
module.exports=app;