const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createGiftDeed = async (data) => {
    const sql = 'INSERT INTO giftdeed ( session_id, DocType, DonorName, DoneeName, RegistrationDate, DocNumber, IssuigAuthority) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const result = await pool.query(sql, data);
    return result.rows[0];
};


const getGiftDeed = async () => {
    const sql = 'SELECT  DocType, DonorName, DoneeName, RegistrationDate, DocNumber, IssuigAuthority FROM giftdeed';
    const result = await pool.query(sql);
    return result.rows;
};


module.exports = { createGiftDeed,getGiftDeed};
