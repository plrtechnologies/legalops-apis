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

module.exports=app;