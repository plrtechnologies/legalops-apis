/**
 * @swagger
 * /housetaxdemand-notice:
 *   post:
 *     summary: Add a new housetaxdemandNotice
 *     tags:
 *       - housetaxdemandNotice
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
 *                  NoticeIssuigAuthority:
 *                      type: string
 *                  DoorNumberOnReceipt:
 *                      type: string
 *                  AssessmentNumberOnReceipt:
 *                      type: string
 *                  AmountDue:
 *                      type: string
 *                  AmountDueInFavourOf:
 *                      type: string
 *     responses:
 *       200:
 *         description: Successfully added housetaxdemandNotice.
 *       500:
 *         description: Error adding housetaxdemandNotice.
 */
/**
 * @swagger
 * /housetaxdemand-notices:
 *   get:
 *     summary: Retrieve all housetaxdemandNotice
 *     tags:
 *       - housetaxdemandNotice
 *     responses:
 *       200:
 *         description: List of housetaxdemandNotice
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
 *                   NoticeIssuigAuthority:
 *                     type: string
 *                   DoorNumberOnReceipt:
 *                     type: string
 *                   AssessmentNumberOnReceipt:
 *                     type: string
 *                   AmountDue:
 *                     type: string
 *                   AmountDueInFavourOf:
 *                     type: string
 *       500:
 *         description: Error retrieving housetaxdemandNotice.
 */
module.exports=app;