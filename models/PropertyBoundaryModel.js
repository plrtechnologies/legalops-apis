const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createPropertyboundary = async (data) => {
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

    const result = await pool.query(sql, data);
    return result.rows[0];
};

const getPropertyboundaries = async () => {
    const sql = 'SELECT * FROM sessions';
    const result = await pool.query(sql);
    return result.rows;
};

module.exports = {
    createPropertyboundary,
    getPropertyboundaries, 
  
};
