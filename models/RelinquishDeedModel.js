const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createRelinquisDeed = async (data) => {
    const sql = 'INSERT INTO relinquishdeed ( session_id, DocType, RelinquisherName, RecipientName, RegistrationDate, DocNumber, IssuigAuthority) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const result = await pool.query(sql, data);
    return result.rows[0];
};


const getRelinquisDeed = async () => {
    const sql = 'SELECT  DocType, RelinquisherName, RecipientName, RegistrationDate, DocNumber, IssuigAuthority FROM relinquishdeed';
    const result = await pool.query(sql);
    return result.rows;
};


module.exports = { createRelinquisDeed,getRelinquisDeed};
