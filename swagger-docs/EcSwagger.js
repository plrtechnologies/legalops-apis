/**
 * @swagger
 * /ec:
 *   post:
 *     summary: Add a new EC
 *     tags:
 *       - EC
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
 *                  EcIssuigAuthority:
 *                      type:string
 *                  EcStatementNumber:
 *                      type:string       
 *                  FromDate:
 *                      type:string
 *                  ToDate:
 *                      type:string
 *               
 *     responses:
 *       200:
 *         description: Successfully added EC.
 *       500:
 *         description: Error adding EC.
 * /
 /**
 * @swagger
 * /ecs:
 *   get:
 *     summary: Retrieve all ECs
 *     tags:
 *       - EC
 *     responses:
 *       200:
 *         description: List of ECs.
 *     content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error retriving Ec.
 */
 module.exports=app;