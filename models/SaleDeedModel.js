const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createSaleDeed = async (data) => {
    const {
        session_id, DocType, SellerName, BuyerName, RegistrationDate, DocNumber, IssuigAuthority
    } = data;
    const sql = 'INSERT INTO saledeed ( session_id, DocType, SellerName, BuyerName, RegistrationDate, DocNumber, IssuigAuthority) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [session_id, DocType, SellerName, BuyerName, RegistrationDate, DocNumber, IssuigAuthority];
    const result = await pool.query(sql, values);
    return result.rows[0];
};


const getSaleDeed = async (session_id) => {
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
        console.error('Error fetching SaleDeed:', err);
        throw err;
    }
};


module.exports = { createSaleDeed,getSaleDeed};
