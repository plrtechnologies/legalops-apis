const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createHouseTaxReceipt = async (data) => {
    const sql = 'INSERT INTO housetaxreceipt ( session_id, DocType, ReceiptIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountPaid, AmountPaidInFavourOf ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const result = await pool.query(sql, data);
    return result.rows[0];
};


const getHouseTaxReceipt = async () => {
    const sql = 'SELECT  DocType, ReceiptIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountPaid, AmountPaidInFavourOf FROM housetaxreceipt' ;
    const result = await pool.query(sql);
    return result.rows;
};


module.exports = { createHouseTaxReceipt,getHouseTaxReceipt};
