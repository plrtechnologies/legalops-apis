const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createMortgageDeed = async (data) => {
    const sql = 'INSERT INTO mortgagedeed ( session_id, DocType, MortgagorName, MortgageeName, RegistrationDate, DocNumber, IssuigAuthority) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const result = await pool.query(sql, data);
    return result.rows[0];
};


const getMortgageDeed = async () => {
    const sql = 'SELECT  DocType, MortgagorName, MortgageeName, RegistrationDate, DocNumber, IssuigAuthority FROM mortgagedeed';
    const result = await pool.query(sql);
    return result.rows;
};


module.exports = { createMortgageDeed,getMortgageDeed};
