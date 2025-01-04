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
module.exports=app;