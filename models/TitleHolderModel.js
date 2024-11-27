const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createTitleHolder = async (data) => {
    const sql = 'INSERT INTO titleholderdetails ( session_id, TitleHolderName, TitleHolderRelationType, TitleHolderRelativeName, TitleHolderResidenceType, TitleHolderDoorNumber, TitleHolderStreetName, TitleHolderCityName, TitleHolderMandalName, TitleHolderDistrictName, TitleHolderPincode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11) RETURNING *';
    const result = await pool.query(sql, data);
    return result.rows[0];
};


const getTitleHolder = async () => {
    const sql = 'SELECT TitleHolderName, TitleHolderRelationType, TitleHolderRelativeName, TitleHolderResidenceType, TitleHolderDoorNumber, TitleHolderStreetName, TitleHolderCityName, TitleHolderMandalName, TitleHolderDistrictName, TitleHolderPincode FROM titleholderdetails';
    const result = await pool.query(sql);
    return result.rows;
};


module.exports = { createTitleHolder,getTitleHolder};
