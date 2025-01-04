/**
 * @swagger
 * /mortgage-deed:
 *   post:
 *     summary: Add a new Mortgage Deed
 *     tags:
 *       - Mortgage Deed
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
 *                  MortgagorName:
 *                      type: string
 *                  MortgageeName:
 *                      type: string
 *                  RegistrationDate:
 *                      type: string
 *                      format: date
 *                  DocNumber:
 *                      type: string
 *                  IssuingAuthority:
 *                      type: string
 *     responses:
 *       200:
 *         description: Successfully added Mortgage Deed.
 *       500:
 *         description: Error adding Mortgage Deed.
 */
/**
 * @swagger
 * /mortgage-deeds:
 *   get:
 *     summary: Retrieve all Mortgage Deeds
 *     tags:
 *       - Mortgage Deed
 *     responses:
 *       200:
 *         description: List of Mortgage Deeds.
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
 *                   MortgagorName:
 *                     type: string
 *                   MortgageeName:
 *                     type: string
 *                   RegistrationDate:
 *                     type: string
 *                     format: date
 *                   DocNumber:
 *                     type: string
 *                   IssuingAuthority:
 *                     type: string
 *       500:
 *         description: Error retrieving Mortgage Deeds.
 */
module.exports=app;