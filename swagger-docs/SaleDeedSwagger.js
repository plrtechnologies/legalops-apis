
/**
 * @swagger
 * /sale-deed:
 *   post:
 *     summary: Add a new Sale Deed
 *     tags:
 *       - Sale Deed
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
 *                  SellerName:
 *                      type: string
 *                  BuyerName:
 *                      type: string       
 *                  RegistrationDate:
 *                      type: string
 *                  DocNumber:
 *                      type: string
 *                  IssuingAuthority:
 *                      type: string           
 *     responses:
 *       200:
 *         description: Successfully added Sale Deed.
 *       500:
 *         description: Error adding Sale Deed.
 */
/**
 * @swagger
 * /sale-deeds:
 *   get:
 *     summary: Retrieve all Sale Deeds
 *     tags:
 *       - Sale Deed
 *     responses:
 *       200:
 *         description: List of Sale Deeds.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error retrieving Sale Deeds.
 */
module.exports=app;