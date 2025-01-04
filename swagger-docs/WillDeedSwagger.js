/**
 * @swagger
 * /will-deed:
 *   post:
 *     summary: Add a new Will Deed
 *     tags:
 *       - Will Deed
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
 *                  TestatorName:
 *                      type: string
 *                  BeneficiaryName:
 *                      type: string       
 *                  RegistrationDate:
 *                      type: string
 *                  DocNumber:
 *                      type: string
 *                  IssuigAuthority:
 *                      type: string           
 *     responses:
 *       200:
 *         description: Successfully added Will Deed.
 *       500:
 *         description: Error adding Will Deed.
 */
/**
 * @swagger
 * /will-deeds:
 *   get:
 *     summary: Retrieve all Will Deeds
 *     tags:
 *       - Will Deed
 *     responses:
 *       200:
 *         description: List of Will Deeds.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                  session_id:
 *                      type: string
 *                  DocType:
 *                      type: string
 *                  TestatorName:
 *                      type: string
 *                  BeneficiaryName:
 *                      type: string       
 *                  RegistrationDate:
 *                      type: string
 *                  DocNumber:
 *                      type: string
 *                  IssuigAuthority:
 *                      type: string
 *       500:
 *         description: Error retrieving Will Deeds.
 */
    module.exports=app;