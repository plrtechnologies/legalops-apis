const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createTitleHolder = async (data) => {
    const sql = 'INSERT INTO titleholder ( th_name, th_relation_type, th_relative_name, th_residence_type, th_door_number, th_street_name, th_city_name, th_mandal_name, th_district_name, th_pincode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
    const result = await pool.query(sql, data);
    return result.rows[0];
};


const getTitleHolder = async () => {
    const sql = 'SELECT * FROM titleholder';
    const result = await pool.query(sql);
    return result.rows;
};


module.exports = { createTitleHolder,getTitleHolder};
