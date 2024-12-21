const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createHouseTaxDemandNotice = async (data) => {
    const sql = 'INSERT INTO housetaxdemandnotice ( session_id, DocType, NoticeIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountDue, AmountDueInFavourOf ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const result = await pool.query(sql, data);
    return result.rows[0];
};


const getHouseTaxDemandNotice = async () => {
    const sql = 'SELECT  DocType, NoticeIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountDue, AmountDueInFavourOf FROM housetaxdemandnotice' ;
    const result = await pool.query(sql);
    return result.rows;
};


module.exports = { createHouseTaxDemandNotice,getHouseTaxDemandNotice};









