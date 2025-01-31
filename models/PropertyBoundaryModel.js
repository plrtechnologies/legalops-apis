const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createPropertyBoundary = async (data) => {
    const {
        session_id, eastBoundrytype, eastBoundryExtent, eastBoundryOwner, 
         westBoundrytype, westBoundryExtent, westBoundryOwner, 
         northBoundrytype, northBoundryExtent, northBoundryOwner, 
         southBoundrytype, southBoundryExtent, southBoundryOwner
    } = data;
    const sql = `
        INSERT INTO sessions 
        ("session_id", "eastBoundrytype", "eastBoundryExtent", "eastBoundryOwner", 
         "westBoundrytype", "westBoundryExtent", "westBoundryOwner", 
         "northBoundrytype", "northBoundryExtent", "northBoundryOwner", 
         "southBoundrytype", "southBoundryExtent", "southBoundryOwner")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        ON CONFLICT ("session_id")
        DO UPDATE 
            SET 
                "eastBoundrytype" = EXCLUDED."eastBoundrytype",
                "eastBoundryExtent" = EXCLUDED."eastBoundryExtent",
                "eastBoundryOwner" = EXCLUDED."eastBoundryOwner",
                "westBoundrytype" = EXCLUDED."westBoundrytype",
                "westBoundryExtent" = EXCLUDED."westBoundryExtent",
                "westBoundryOwner" = EXCLUDED."westBoundryOwner",
                "northBoundrytype" = EXCLUDED."northBoundrytype",
                "northBoundryExtent" = EXCLUDED."northBoundryExtent",
                "northBoundryOwner" = EXCLUDED."northBoundryOwner",
                "southBoundrytype" = EXCLUDED."southBoundrytype",
                "southBoundryExtent" = EXCLUDED."southBoundryExtent",
                "southBoundryOwner" = EXCLUDED."southBoundryOwner"
        RETURNING "session_id", "eastBoundrytype", "eastBoundryExtent", "eastBoundryOwner", 
                  "westBoundrytype", "westBoundryExtent", "westBoundryOwner", 
                  "northBoundrytype", "northBoundryExtent", "northBoundryOwner", 
                  "southBoundrytype", "southBoundryExtent", "southBoundryOwner";
    `;
    const values = [
        session_id, eastBoundrytype, eastBoundryExtent, eastBoundryOwner, 
         westBoundrytype, westBoundryExtent, westBoundryOwner, 
         northBoundrytype, northBoundryExtent, northBoundryOwner, 
         southBoundrytype, southBoundryExtent, southBoundryOwner];

    const result = await pool.query(sql, values);
    return result.rows[0];
};

const getPropertyBoundaries = async (session_id) => {
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
        console.error('Error fetching PropertyBoundary:', err);
        throw err;
    }
};

module.exports = {
    createPropertyBoundary,
    getPropertyBoundaries, 
  
};
