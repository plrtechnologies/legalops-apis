const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createMortgageDeed = async (data) => {
    const {
        session_id, DocType, MortgagorName, MortgageeName, RegistrationDate, DocNumber, IssuigAuthority
    } = data;
    const sql = `
   INSERT INTO mortgagedeed 
    (session_id, docType, mortgagorName, mortgageeName, registrationDate, docNumber, issuigAuthority)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT ("session_id") 
    DO UPDATE 
    SET 
        docType = EXCLUDED.docType,
        mortgagorName = EXCLUDED.mortgagorName,
        mortgageeName = EXCLUDED.mortgageeName,
        registrationDate = EXCLUDED.registrationDate,
        docNumber = EXCLUDED.docNumber,
        issuigAuthority = EXCLUDED.issuigAuthority
    RETURNING session_id, docType, mortgagorName, mortgageeName, registrationDate, docNumber, issuigAuthority;
    `;

    const values = [ session_id, DocType, MortgagorName, MortgageeName, RegistrationDate, DocNumber, IssuigAuthority];
    const result = await pool.query(sql, values);
    return result.rows[0];
};


const getMortgageDeed = async (session_id) => {
    try {
        // SQL query to fetch loan proposers for a specific session_id
        const sql = `
            SELECT * FROM mortgagedeed 
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
        console.error('Error fetching MortgageDeed:', err);
        throw err;
    }
};

module.exports = { createMortgageDeed,getMortgageDeed};
