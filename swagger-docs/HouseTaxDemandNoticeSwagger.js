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