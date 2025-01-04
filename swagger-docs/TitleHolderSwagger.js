/**
 * @swagger
 * /title-holder:
 *   post:
 *     summary: Add a new Title Holder
 *     tags:
 *       - Title Holder
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object  
 *             properties:
 *                  session_id:
 *                      type: string
 *                  TitleHolderName:
 *                      type: string
 *                  TitleHolderRelationType:
 *                      type: string
 *                  TitleHolderRelativeName:
 *                      type: string
 *                  TitleHolderResidenceType:
 *                      type: string
 *                  TitleHolderDoorNumber:
 *                      type: string
 *                  TitleHolderStreetName:
 *                      type: string
 *                  TitleHolderCityName:
 *                      type: string
 *                  TitleHolderMandalName:
 *                      type: string
 *                  TitleHolderDistrictName:
 *                      type: string
 *                  TitleHolderPincode:
 *                      type: string
 *     responses:
 *       200:
 *         description: Successfully added  Title Holder.
 *       500:
 *         description: Error adding Title Holder.
 */
/**
 * @swagger
 * /title-holders:
 *   get:
 *     summary: Retrieve all Title Holder
 *     tags:
 *       - Title Holder
 *     responses:
 *       200:
 *         description: List of Title Holders.
 *     content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *        500:
 *         description: Error retrieving Title Holders.
 */
module.exports=app;