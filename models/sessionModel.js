const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,  // Bypass cert validation for self-signed certs
    },
  });

const createOrUpdateSession = async (data) => {
    // Convert to boolean safely
    const isSame = String(data.isTitleHolderSameAsLoanProposer).toLowerCase() === 'true';

    // Nullify title holder fields in original data if same as loan proposer
    if (isSame) {
        data.titleHolderName = null;
        data.titleHolderRelationType = null;
        data.titleHolderRelativeName = null;
        data.titleHolderResidenceType = null;
        data.titleHolderDoorNumber = null;
        data.titleHolderStreetName = null;
        data.titleHolderCityName = null;
        data.titleHolderMandalName = null;
        data.titleHolderDistrictName = null;
        data.titleHolderPincode = null;
    }

    // Destructure AFTER modifying the data object
    let {
        session_id, user_id,
        // Loan Proposer
        loanProposerName, loanProposerRelationType, loanProposerRelativeName,
        loanProposerResidenceType, loanProposerDoorNumber, loanProposerStreetName,
        loanProposerCityName, loanProposerMandalName, loanProposerDistrictName, loanProposerPincode, isTitleHolderSameAsLoanProposer,

        // Title Holder
        titleHolderName, titleHolderRelationType, titleHolderRelativeName, titleHolderResidenceType,
        titleHolderDoorNumber, titleHolderStreetName, titleHolderCityName, titleHolderMandalName,
        titleHolderDistrictName, titleHolderPincode,

        // Property Details
        propertyDoorNumber, nearbyDoor, propertyAssessmentNumber, propertySurveyNumber,
        extentOfProperty, propertyType, propertyNature,

        // Property Boundaries
        eastBoundaryType, eastBoundaryExtent, eastBoundaryOwner,
        westBoundaryType, westBoundaryExtent, westBoundaryOwner,
        northBoundaryType, northBoundaryExtent, northBoundaryOwner,
        southBoundaryType, southBoundaryExtent, southBoundaryOwner,

        // Most Recent Document
        selectDeedType, dateOfRegistration, documentNumber, nameOfSubRegistrarOffice,
        locationOfSubRegistrarOffice, subRegistrarOfficeMandal, subRegistrarOfficeDistrict, subRegistrarOfficeLocalAuthority
    } = data;

    const titleHolderValues = [
        titleHolderName, titleHolderRelationType, titleHolderRelativeName,
        titleHolderResidenceType, titleHolderDoorNumber, titleHolderStreetName,
        titleHolderCityName, titleHolderMandalName, titleHolderDistrictName, titleHolderPincode
    ];

    const sql = `
        INSERT INTO sessions (
            "session_id", "user_id",

            "loanProposerName", "loanProposerRelationType", "loanProposerRelativeName", "loanProposerResidenceType",
            "loanProposerDoorNumber", "loanProposerStreetName", "loanProposerCityName", "loanProposerMandalName",
            "loanProposerDistrictName", "loanProposerPincode", "isTitleHolderSameAsLoanProposer",

            "titleHolderName", "titleHolderRelationType", "titleHolderRelativeName", "titleHolderResidenceType",
            "titleHolderDoorNumber", "titleHolderStreetName", "titleHolderCityName", "titleHolderMandalName",
            "titleHolderDistrictName", "titleHolderPincode",

            "propertyDoorNumber", "nearbyDoor", "propertyAssessmentNumber", "propertySurveyNumber",
            "extentOfProperty", "propertyType", "propertyNature",

            "eastBoundaryType", "eastBoundaryExtent", "eastBoundaryOwner",
            "westBoundaryType", "westBoundaryExtent", "westBoundaryOwner",
            "northBoundaryType", "northBoundaryExtent", "northBoundaryOwner",
            "southBoundaryType", "southBoundaryExtent", "southBoundaryOwner",

            "selectDeedType", "dateOfRegistration", "documentNumber", "nameOfSubRegistrarOffice",
            "locationOfSubRegistrarOffice", "subRegistrarOfficeMandal", "subRegistrarOfficeDistrict", "subRegistrarOfficeLocalAuthority"
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
            $13, $14, $15, $16, $17, $18, $19, $20, $21, $22,
            $23, $24, $25, $26, $27, $28, $29,
            $30, $31, $32, $33, $34, $35, $36, $37, $38, $39,
            $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50
        )
        ON CONFLICT (session_id) DO UPDATE SET
          
            "user_id" = EXCLUDED."user_id",

            "loanProposerName" = EXCLUDED."loanProposerName",
            "loanProposerRelationType" = EXCLUDED."loanProposerRelationType",
            "loanProposerRelativeName" = EXCLUDED."loanProposerRelativeName",
            "loanProposerResidenceType" = EXCLUDED."loanProposerResidenceType",
            "loanProposerDoorNumber" = EXCLUDED."loanProposerDoorNumber",
            "loanProposerStreetName" = EXCLUDED."loanProposerStreetName",
            "loanProposerCityName" = EXCLUDED."loanProposerCityName",
            "loanProposerMandalName" = EXCLUDED."loanProposerMandalName",
            "loanProposerDistrictName" = EXCLUDED."loanProposerDistrictName",
            "loanProposerPincode" = EXCLUDED."loanProposerPincode",
            "isTitleHolderSameAsLoanProposer" = EXCLUDED."isTitleHolderSameAsLoanProposer",

            "titleHolderName" = EXCLUDED."titleHolderName",
            "titleHolderRelationType" = EXCLUDED."titleHolderRelationType",
            "titleHolderRelativeName" = EXCLUDED."titleHolderRelativeName",
            "titleHolderResidenceType" = EXCLUDED."titleHolderResidenceType",
            "titleHolderDoorNumber" = EXCLUDED."titleHolderDoorNumber",
            "titleHolderStreetName" = EXCLUDED."titleHolderStreetName",
            "titleHolderCityName" = EXCLUDED."titleHolderCityName",
            "titleHolderMandalName" = EXCLUDED."titleHolderMandalName",
            "titleHolderDistrictName" = EXCLUDED."titleHolderDistrictName",
            "titleHolderPincode" = EXCLUDED."titleHolderPincode",

            "propertyDoorNumber" = EXCLUDED."propertyDoorNumber",
            "nearbyDoor" = EXCLUDED."nearbyDoor",
            "propertyAssessmentNumber" = EXCLUDED."propertyAssessmentNumber",
            "propertySurveyNumber" = EXCLUDED."propertySurveyNumber",
            "extentOfProperty" = EXCLUDED."extentOfProperty",
            "propertyType" = EXCLUDED."propertyType",
            "propertyNature" = EXCLUDED."propertyNature",

            "eastBoundaryType" = EXCLUDED."eastBoundaryType",
            "eastBoundaryExtent" = EXCLUDED."eastBoundaryExtent",
            "eastBoundaryOwner" = EXCLUDED."eastBoundaryOwner",
            "westBoundaryType" = EXCLUDED."westBoundaryType",
            "westBoundaryExtent" = EXCLUDED."westBoundaryExtent",
            "westBoundaryOwner" = EXCLUDED."westBoundaryOwner",
            "northBoundaryType" = EXCLUDED."northBoundaryType",
            "northBoundaryExtent" = EXCLUDED."northBoundaryExtent",
            "northBoundaryOwner" = EXCLUDED."northBoundaryOwner",
            "southBoundaryType" = EXCLUDED."southBoundaryType",
            "southBoundaryExtent" = EXCLUDED."southBoundaryExtent",
            "southBoundaryOwner" = EXCLUDED."southBoundaryOwner",

            "selectDeedType" = EXCLUDED."selectDeedType",
            "dateOfRegistration" = EXCLUDED."dateOfRegistration",
            "documentNumber" = EXCLUDED."documentNumber",
            "nameOfSubRegistrarOffice" = EXCLUDED."nameOfSubRegistrarOffice",
            "locationOfSubRegistrarOffice" = EXCLUDED."locationOfSubRegistrarOffice",
            "subRegistrarOfficeMandal" = EXCLUDED."subRegistrarOfficeMandal",
            "subRegistrarOfficeDistrict" = EXCLUDED."subRegistrarOfficeDistrict",
            "subRegistrarOfficeLocalAuthority" = EXCLUDED."subRegistrarOfficeLocalAuthority"
    
        

        RETURNING *;
    `;

    const values = [
        session_id, user_id,
        loanProposerName, loanProposerRelationType, loanProposerRelativeName, loanProposerResidenceType,
        loanProposerDoorNumber, loanProposerStreetName, loanProposerCityName, loanProposerMandalName,
        loanProposerDistrictName, loanProposerPincode, isTitleHolderSameAsLoanProposer,

        ...titleHolderValues,

        propertyDoorNumber, nearbyDoor, propertyAssessmentNumber, propertySurveyNumber,
        extentOfProperty, propertyType, propertyNature,

        eastBoundaryType, eastBoundaryExtent, eastBoundaryOwner,
        westBoundaryType, westBoundaryExtent, westBoundaryOwner,
        northBoundaryType, northBoundaryExtent, northBoundaryOwner,
        southBoundaryType, southBoundaryExtent, southBoundaryOwner,

        selectDeedType, dateOfRegistration, documentNumber, nameOfSubRegistrarOffice,
        locationOfSubRegistrarOffice, subRegistrarOfficeMandal, subRegistrarOfficeDistrict, subRegistrarOfficeLocalAuthority
    ];

    const result = await pool.query(sql, values);
    return result.rows[0];
};

const getSessionById = async (session_id) => {
    const sql = `SELECT * FROM sessions WHERE session_id = $1;`;
    const result = await pool.query(sql, [session_id]);
    return result.rows[0] || null;

};


const getSessionsByName = async (name) => {
    const sql = `SELECT * FROM sessions WHERE "loanProposerName" = $1;`;
    const result = await pool.query(sql, [name]);
    return result.rows; // return all matching rows as an array
  };
  

  const getSessionsByUserId = async (user_id) => {
    const sql = `
      SELECT * FROM sessions 
      WHERE user_id = $1;
    `;
    const result = await pool.query(sql, [user_id]);
    return result.rows; // returns an array of sessions
  };
  

module.exports = {
    createOrUpdateSession,
    getSessionById,
    getSessionsByName,
    getSessionsByUserId 

};
