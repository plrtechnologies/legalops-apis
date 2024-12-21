const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createEc = async (data) => {
    const sql = 'INSERT INTO ec ( session_id, DocType, EcIssuigAuthority, EcStatementNumber, FromDate, ToDate) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const result = await pool.query(sql, data);
    return result.rows[0];
};


const getEc = async () => {
    const sql = 'SELECT  DocType, EcIssuigAuthority, EcStatementNumber, FromDate, ToDate FROM ec';
    const result = await pool.query(sql);
    return result.rows;
};


module.exports = { createEc,getEc};
