const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createPropDetail = async (data) => {

    // Destructure the fields from the data object to ensure they are in the correct order
    const {
        session_id, propertyDoorNumber, nearbyDoor, propertyAssessmentNumber, propertySurveyNumber,
        ExtentOfProperty, propertyType, propertyNature
    } = data;

    const sql = `
        INSERT INTO sessions 
        ("session_id", "propertyDoorNumber", "nearbyDoor", "propertyAssessmentNumber", "propertySurveyNumber", "ExtentOfProperty", "propertyType", "propertyNature") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT ("session_id") 
        DO UPDATE 
        SET 
            "propertyDoorNumber" = EXCLUDED."propertyDoorNumber",
            "nearbyDoor" = EXCLUDED."nearbyDoor",
            "propertyAssessmentNumber" = EXCLUDED."propertyAssessmentNumber",
            "propertySurveyNumber" = EXCLUDED."propertySurveyNumber",
            "ExtentOfProperty" = EXCLUDED."ExtentOfProperty",
            "propertyType" = EXCLUDED."propertyType",
            "propertyNature" = EXCLUDED."propertyNature"
        RETURNING "session_id", "propertyDoorNumber", "nearbyDoor", "propertyAssessmentNumber", "propertySurveyNumber", "ExtentOfProperty", "propertyType", "propertyNature";
    `;

    // Pass data as an array
    const values = [
        session_id, propertyDoorNumber, nearbyDoor, propertyAssessmentNumber, propertySurveyNumber,
        ExtentOfProperty, propertyType, propertyNature
    ];
    
    const result = await pool.query(sql, values);
    return result.rows[0];
};

const getPropDetails = async (session_id) => {
    try {
        // SQL query to fetch loan proposers for a specific session_id
        const sql = `
            SELECT * FROM sessions 
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
        console.error('Error fetching propdetails:', err);
        throw err;
    }
};

module.exports = {
    createPropDetail,
    getPropDetails,
};
