const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createLoanProposer = async (data) => {
    // Destructure the fields from the data object to ensure they are in the correct order
    const {
        session_id, loanProposerName, loanProposerRelationType, loanProposerRelativeName,
        loanProposerResidenceType, loanProposerDoorNumber, loanProposerStreetName,
        loanProposerCityName, loanProposerMandalName, loanProposerDistrictName, loanProposerPincode
    } = data;

    // Make sure data is an array for the query
    const sql = `
        INSERT INTO sessions 
        ("session_id", "loanProposerName", "loanProposerRelationType", "loanProposerRelativeName", "loanProposerResidenceType", "loanProposerDoorNumber", "loanProposerStreetName", "loanProposerCityName", "loanProposerMandalName", "loanProposerDistrictName", "loanProposerPincode")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,)
        ON CONFLICT ("session_id") 
        DO UPDATE 
        SET 
            "loanProposerName" = EXCLUDED."loanProposerName",
            "loanProposerRelationType" = EXCLUDED."loanProposerRelationType",
            "loanProposerRelativeName" = EXCLUDED."loanProposerRelativeName",
            "loanProposerResidenceType" = EXCLUDED."loanProposerResidenceType",
            "loanProposerDoorNumber" = EXCLUDED."loanProposerDoorNumber",
            "loanProposerStreetName" = EXCLUDED."loanProposerStreetName",
            "loanProposerCityName" = EXCLUDED."loanProposerCityName",
            "loanProposerMandalName" = EXCLUDED."loanProposerMandalName",
            "loanProposerDistrictName" = EXCLUDED."loanProposerDistrictName",
            "loanProposerPincode" = EXCLUDED."loanProposerPincode"
        RETURNING  "session_id", "loanProposerName", "loanProposerRelationType", "loanProposerRelativeName", "loanProposerResidenceType", "loanProposerDoorNumber", "loanProposerStreetName", "loanProposerCityName", "loanProposerMandalName", "loanProposerDistrictName", "loanProposerPincode";
    `;
    
    // Pass data as an array
    const values = [
        session_id, loanProposerName, loanProposerRelationType, loanProposerRelativeName,
        loanProposerResidenceType, loanProposerDoorNumber, loanProposerStreetName,
        loanProposerCityName, loanProposerMandalName, loanProposerDistrictName, loanProposerPincode
    ];
    
    const result = await pool.query(sql, values);
    return result.rows[0];
};

const getLoanProposers = async (session_id) => {
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
            return [];  // Return an empty array if no loan proposers are found for the session_id
        }
    } catch (err) {
        console.error('Error fetching loan proposers:', err);
        throw err;
    }
};



module.exports = {
    createLoanProposer,
    getLoanProposers,
};
