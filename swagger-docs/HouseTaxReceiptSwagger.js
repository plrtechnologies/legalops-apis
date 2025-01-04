/**
 * @swagger
 * /api/housetax-receipt:
 *   post:
 *     summary: Add a new housetaxReceipt
 *     tags:
 *       - housetaxReceipt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object  
 *             properties:
 *               session_id:
 *                 type: string 
 *               DocType:
 *                 type: string 
 *               ReceiptIssuigAuthority:
 *                 type: string
 *               DoorNumberOnReceipt:
 *                 type: string       
 *               AssessmentNumberOnReceipt:
 *                 type: string
 *               AmountPaid:
 *                 type: string
 *               AmountPaidInFavourOf:
 *                 type: string           
 *     responses:
 *       200:
 *         description: Successfully added housetaxReceipt.
 *       500:
 *         description: Error adding housetaxReceipt.
 */
/**
 * @swagger
 * /api/housetax-receipts:
 *   get:
 *     summary: Retrieve all housetaxReceipt
 *     tags:
 *       - housetaxReceipt
 *     responses:
 *       200:
 *         description: List of housetaxReceipts.
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
 *                   ReceiptIssuigAuthority:
 *                     type: string
 *                   DoorNumberOnReceipt:
 *                     type: string       
 *                   AssessmentNumberOnReceipt:
 *                     type: string
 *                   AmountPaid:
 *                     type: string
 *                   AmountPaidInFavourOf:
 *                     type: string
 *       500:
 *         description: Error retrieving housetaxReceipt.
 */
module.exports=app;