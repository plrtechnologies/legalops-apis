const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createSaleDeed = async (data) => {
    const sql = 'INSERT INTO saledeed ( session_id, DocType, SellerName, BuyerName, RegistrationDate, DocNumber, IssuigAuthority) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const result = await pool.query(sql, data);
    return result.rows[0];
};


const getSaleDeed = async () => {
    const sql = 'SELECT  DocType, SellerName, BuyerName, RegistrationDate, DocNumber, IssuigAuthority FROM saledeed';
    const result = await pool.query(sql);
    return result.rows;
};


module.exports = { createSaleDeed,getSaleDeed};
