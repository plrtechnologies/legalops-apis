const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createLoanProposer = async (data) => {
    const sql = 'INSERT INTO sessions (session_id, name, relation_type, relative_name, residence_type, door_number, street_name, city_name, mandal_name, district_name, pincode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
    const result = await pool.query(sql, data);
    return result.rows[0];
};

const getLoanProposers = async () => {
    const sql = 'SELECT * FROM sessions';
    const result = await pool.query(sql);
    return result.rows;
};


module.exports = {
    createLoanProposer,
    getLoanProposers, 
  
};
