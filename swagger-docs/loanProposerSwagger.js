/**
 * @swagger
 * /api/loan-proposer:
 *   post:
 *     summary: Add a new Loan Proposer
 *     tags:
 *       - Loan Proposer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object  
 *             properties:
 *               session_id:
 *                 type: string
 *               loanProposerName:
 *                 type: string
 *               loanProposerRelationType:
 *                 type: string
 *               loanProposerRelativeName:
 *                 type: string
 *               loanProposerResidenceType:
 *                 type: string
 *               loanProposerDoorNumber:
 *                 type: string
 *               loanProposerStreetName:
 *                 type: string
 *               loanProposerCityName:
 *                 type: string
 *               loanProposerMandalName:
 *                 type: string
 *               loanProposerDistrictName:
 *                 type: string
 *               loanProposerPincode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully added Loan Proposer.
 *       500:
 *         description: Error adding Loan Proposer.
 */
/**
 * @swagger
 * /api/loan-proposers:
 *   get:
 *     summary: Retrieve all Loan Proposers
 *     tags:
 *       - Loan Proposer
 *     responses:
 *       200:
 *         description: List of Loan Proposers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *               session_id:
 *                 type: string
 *               loanProposerName:
 *                 type: string
 *               loanProposerRelationType:
 *                 type: string
 *               loanProposerRelativeName:
 *                 type: string
 *               loanProposerResidenceType:
 *                 type: string
 *               loanProposerDoorNumber:
 *                 type: string
 *               loanProposerStreetName:
 *                 type: string
 *               loanProposerCityName:
 *                 type: string
 *               loanProposerMandalName:
 *                 type: string
 *               loanProposerDistrictName:
 *                 type: string
 *               loanProposerPincode:
 *                 type: string
 *       500:
 *         description: Error retrieving Loan Proposers.
 */
module.exports=app;