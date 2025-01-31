const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createHouseTaxReceipt = async (data) => {
    const {
        session_id, DocType, ReceiptIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountPaid, AmountPaidInFavourOf
    } = data;
    const sql = 'INSERT INTO housetaxreceipt ( session_id, DocType, ReceiptIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountPaid, AmountPaidInFavourOf ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    // Pass data as an array
const values = [session_id, DocType, ReceiptIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountPaid, AmountPaidInFavourOf];
const result = await pool.query(sql, values);
return result.rows[0];
};

const getHouseTaxReceipt = async (session_id) => {
    try {
        // SQL query to fetch loan proposers for a specific session_id
        const sql = `
            SELECT * FROM sessions 
            WHERE "session_id" = $1;
        `;
        const values = [session_id];
        
        const result = await pool.query(sql, values);
        
        // Return the results if any rows are found
        if (result.rows.length > 0) {
            return result.rows;
        } else {
            return [];  
        }
    } catch (err) {
        console.error('Error fetching HouseTaxReceipt:', err);
        throw err;
    }
};


module.exports = { createHouseTaxReceipt,getHouseTaxReceipt};
