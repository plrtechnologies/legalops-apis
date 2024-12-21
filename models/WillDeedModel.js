const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createWillDeed = async (data) => {
    const sql = 'INSERT INTO willdeed ( session_id, DocType, TestatorName, BeneficiaryName, RegistrationDate, DocNumber, IssuigAuthority) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const result = await pool.query(sql, data);
    return result.rows[0];
};


const getWillDeed = async () => {
    const sql = 'SELECT  DocType, TestatorName, BeneficiaryName, RegistrationDate, DocNumber, IssuigAuthority FROM willdeed';
    const result = await pool.query(sql);
    return result.rows;
};


module.exports = { createWillDeed,getWillDeed};
