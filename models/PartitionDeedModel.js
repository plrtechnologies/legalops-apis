const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createPartitionDeed = async (data) => {
    const {
        session_id, DocType, PartitionerName, RecipientName, RegistrationDate, DocNumber, IssuigAuthority
    } = data;
    const sql = `
    INSERT INTO partitiondeed 
    (session_id, doctype, partitionername, recipientname, registrationdate, docnumber, issuigauthority) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT ("session_id") 
        DO UPDATE 
        SET 
            doctype = EXCLUDED.doctype,
            partitionername = EXCLUDED.partitionername,
            recipientname = EXCLUDED.recipientname,
            registrationdate = EXCLUDED.registrationdate,
            docnumber = EXCLUDED.docnumber,
            issuigauthority = EXCLUDED.issuigauthority
        RETURNING session_id, doctype, partitionername, recipientname, registrationdate, docnumber, issuigauthority;
    `;
    const values = [ session_id, DocType, PartitionerName, RecipientName, RegistrationDate, DocNumber, IssuigAuthority];
   
    const result = await pool.query(sql, values);
    return result.rows[0];
};


const getPartitionDeed = async (session_id) => {
    try {
        // SQL query to fetch loan proposers for a specific session_id
        const sql = `
            SELECT * FROM partitiondeed
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
        console.error('Error fetching PartitionDeed:', err);
        throw err;
    }
};


module.exports = { createPartitionDeed,getPartitionDeed};
