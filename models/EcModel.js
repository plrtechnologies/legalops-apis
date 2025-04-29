const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createEc = async (data) => {

    const {
        session_id, DocType, EcIssuigAuthority, EcStatementNumber, FromDate, ToDate
    } = data;

    const sql =`
      INSERT INTO ec ( session_id, DocType, EcIssuigAuthority, EcStatementNumber, FromDate, ToDate) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    ON CONFLICT ("session_id") 
    DO UPDATE 
    SET 
        DocType = EXCLUDED.DocType,
        EcIssuigAuthority = EXCLUDED.EcIssuigAuthority,
        EcStatementNumber = EXCLUDED.EcStatementNumber,
        FromDate = EXCLUDED.FromDate,
        ToDate = EXCLUDED.ToDate
    RETURNING   session_id, DocType, EcIssuigAuthority, EcStatementNumber, FromDate, ToDate ;
`;

// Pass data as an array
const values = [session_id, DocType, EcIssuigAuthority, EcStatementNumber, FromDate, ToDate];
    const result = await pool.query(sql, values);
    return result.rows[0];
};


const getEc = async (session_id) => {
    try {
        // SQL query to fetch loan proposers for a specific session_id
        const sql = `
            SELECT * FROM ec 
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
        console.error('Error fetching Ec:', err);
        throw err;
    }
};


module.exports = { createEc,getEc};
