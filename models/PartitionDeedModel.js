const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createPartitionDeed = async (data) => {
    const sql = 'INSERT INTO partitiondeed ( session_id, DocType, PartitionerName, RecipientName, RegistrationDate, DocNumber, IssuigAuthority) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const result = await pool.query(sql, data);
    return result.rows[0];
};


const getPartitionDeed = async () => {
    const sql = 'SELECT  DocType, PartitionerName, RecipientName, RegistrationDate, DocNumber, IssuigAuthority FROM partitiondeed';
    const result = await pool.query(sql);
    return result.rows;
};


module.exports = { createPartitionDeed,getPartitionDeed};
