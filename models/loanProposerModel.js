const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createLoanProposer = async (data) => {
    const sql = 'INSERT INTO sessions ( session_id, loanProposerName, loanProposerRelationType, loanProposerRelativeName, loanProposerResidenceType, loanProposerDoorNumber, loanProposerStreetName, loanProposerCityName, loanProposerMandalName, loanProposerDistrictName, loanProposerPincode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING  loanProposerName,loanProposerRelationType,loanProposerRelativeName,loanProposerResidenceType,loanProposerDoorNumber,loanProposerStreetName,loanProposerCityName,loanProposerMandalName,loanProposerDistrictName,loanProposerPincode;';
    const result = await pool.query(sql, data);
    return result.rows[0];
};

const getLoanProposers = async () => {
    const sql = `
        SELECT 
            loanProposerName,
            loanProposerRelationType,
            loanProposerRelativeName,
            loanProposerResidenceType,
            loanProposerDoorNumber,
            loanProposerStreetName,
            loanProposerCityName,
            loanProposerMandalName,
            loanProposerDistrictName,
            loanProposerPincode
        FROM sessions
    `;
    const result = await pool.query(sql);
    return result.rows;  // Return only the loan proposer fields
};
module.exports = {
    createLoanProposer,
    getLoanProposers,
};
