/**
 * @swagger
 * /gift-deed:
 *   post:
 *     summary: Add a new Gift Deed
 *     tags:
 *       - Gift Deed
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object  
 *             properties:
 *                  session_id:
 *                      type:string 
 *                  DocType:
 *                      type:string 
 *                  DonorName:
 *                      type:string
 *                  DoneeName:
 *                      type:string       
 *                  RegistrationDate:
 *                      type:string
 *                  DocNumber:
 *                      type:string
 *                  IssuigAuthority:
 *                      type:string           
 *     responses:
 *       200:
 *         description: Successfully added Gift Deed.
 *       500:
 *         description: Error adding Gift Deed.
 */
module.exports=app;