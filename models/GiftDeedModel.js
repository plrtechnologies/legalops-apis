const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createGiftDeed = async (data) => {

    const {
        session_id, DocType, DonorName, DoneeName, RegistrationDate, DocNumber, IssuigAuthority
    } = data;

    const sql =` 
    INSERT INTO giftdeed ( session_id, DocType, DonorName, DoneeName, RegistrationDate, DocNumber, IssuigAuthority) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT ("session_id") 
    DO UPDATE 
    SET 
        DocType = EXCLUDED.DocType,
        DonorName = EXCLUDED.DonorName,
        DoneeName = EXCLUDED.DoneeName,
        RegistrationDate = EXCLUDED.RegistrationDate,
        DocNumber = EXCLUDED.DocNumber,
         IssuigAuthority = EXCLUDED.IssuigAuthority
    RETURNING   session_id, DocType, DonorName, DoneeName, RegistrationDate, DocNumber, IssuigAuthority ;
`;
// Pass data as an array
const values = [session_id, DocType, DonorName, DoneeName, RegistrationDate, DocNumber, IssuigAuthority];
    const result = await pool.query(sql, values);
    return result.rows[0];
};
   


const getGiftDeed = async (session_id) => {
    try {
        // SQL query to fetch loan proposers for a specific session_id
        const sql = `
            SELECT * FROM giftdeed 
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
        console.error('Error fetching GiftDeed:', err);
        throw err;
    }
};


module.exports = { createGiftDeed,getGiftDeed};
