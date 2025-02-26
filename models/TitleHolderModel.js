const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createTitleHolder = async (data) => {
    const {
        session_id, TitleHolderName, TitleHolderRelationType, TitleHolderRelativeName, TitleHolderResidenceType, TitleHolderDoorNumber, TitleHolderStreetName, TitleHolderCityName, TitleHolderMandalName, TitleHolderDistrictName, TitleHolderPincode
    } = data;
    const sql = `
    INSERT INTO titleholderdetails ( session_id, TitleHolderName, TitleHolderRelationType, TitleHolderRelativeName, TitleHolderResidenceType, TitleHolderDoorNumber, TitleHolderStreetName, TitleHolderCityName, TitleHolderMandalName, TitleHolderDistrictName, TitleHolderPincode) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11)
    ON CONFLICT ("session_id") 
        DO UPDATE 
        SET 
            TitleHolderName = EXCLUDED.TitleHolderName,
            TitleHolderRelationType = EXCLUDED.TitleHolderRelationType,
            TitleHolderRelativeName = EXCLUDED.TitleHolderRelativeName,
            TitleHolderResidenceType = EXCLUDED.TitleHolderResidenceType,
            TitleHolderDoorNumber= EXCLUDED.TitleHolderDoorNumber,
            TitleHolderStreetName = EXCLUDED.TitleHolderStreetName,
            TitleHolderCityName = EXCLUDED.TitleHolderCityName,
            TitleHolderMandalName = EXCLUDED.TitleHolderMandalName,
            TitleHolderDistrictName = EXCLUDED.TitleHolderDistrictName,
            TitleHolderPincode = EXCLUDED.TitleHolderPincode
    
        RETURNING  session_id, TitleHolderName , TitleHolderRelationType, TitleHolderRelativeName, TitleHolderResidenceType,TitleHolderDoorNumber, TitleHolderStreetName, TitleHolderCityName, TitleHolderMandalName, TitleHolderDistrictName, TitleHolderPincode;
    `;
    const values = [session_id, TitleHolderName, TitleHolderRelationType, TitleHolderRelativeName, TitleHolderResidenceType, TitleHolderDoorNumber, TitleHolderStreetName, TitleHolderCityName, TitleHolderMandalName, TitleHolderDistrictName, TitleHolderPincode];
    const result = await pool.query(sql, values);
    return result.rows[0];
};


const getTitleHolder = async (session_id) => {
    try {
        // SQL query to fetch loan proposers for a specific session_id
        const sql = `
            SELECT * FROM titleholderdetails 
            WHERE "session_id" = $1;
        `;
        const values = [session_id];
        
        const result = await pool.query(sql, values);
        
        // Return the results if any rows are found
        if (result.rows.length > 0) {
            return result.rows;
        } else {
            return [];  
        }
    } catch (err) {
        console.error('Error fetching TitleHolder:', err);
        throw err;
    }
};

module.exports = { createTitleHolder,getTitleHolder};
