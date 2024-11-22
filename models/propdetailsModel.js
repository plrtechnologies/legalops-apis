const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createPropDetail = async (data) => {
    const sql = `
        INSERT INTO sessions 
        ("session_id", "propertyDoorNumber", "nearby door", "propertyAssessmentNumber", "propertySurveyNumber", "ExtentOfProperty", "propertyType", "propertyNature") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT ("session_id") 
        DO UPDATE 
        SET 
            "propertyDoorNumber" = EXCLUDED."propertyDoorNumber",
            "nearby door" = EXCLUDED."nearby door",
            "propertyAssessmentNumber" = EXCLUDED."propertyAssessmentNumber",
            "propertySurveyNumber" = EXCLUDED."propertySurveyNumber",
            "ExtentOfProperty" = EXCLUDED."ExtentOfProperty",
            "propertyType" = EXCLUDED."propertyType",
            "propertyNature" = EXCLUDED."propertyNature"
        RETURNING "propertyDoorNumber", "nearby door", "propertyAssessmentNumber", "propertySurveyNumber", "ExtentOfProperty", "propertyType", "propertyNature";
    `;

    const result = await pool.query(sql, data);
    return result.rows[0];
};

const getPropDetails = async () => {
    const sql = 'SELECT "propertyDoorNumber", "nearby door", "propertyAssessmentNumber", "propertySurveyNumber", "ExtentOfProperty", "propertyType", "propertyNature" FROM sessions';
    const result = await pool.query(sql);
    return result.rows;
};

module.exports = {
    createPropDetail,
    getPropDetails,
};
