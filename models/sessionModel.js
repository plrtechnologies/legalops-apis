const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createOrUpdateSession = async (data) => {
    // Convert to boolean safely
    const isSame = String(data.isTitleHolderSameAsLoanProposer).toLowerCase() === 'true';

    // Nullify title holder fields in original data if same as loan proposer
    if (isSame) {
        data.TitleHolderName = null;
        data.TitleHolderRelationType = null;
        data.TitleHolderRelativeName = null;
        data.TitleHolderResidenceType = null;
        data.TitleHolderDoorNumber = null;
        data.TitleHolderStreetName = null;
        data.TitleHolderCityName = null;
        data.TitleHolderMandalName = null;
        data.TitleHolderDistrictName = null;
        data.TitleHolderPincode = null;
    }

    // Destructure AFTER modifying the data object
    let {
        session_id,
    

        // Loan Proposer
        loanProposerName, loanProposerRelationType, loanProposerRelativeName,
        loanProposerResidenceType, loanProposerDoorNumber, loanProposerStreetName,
        loanProposerCityName, loanProposerMandalName, loanProposerDistrictName, loanProposerPincode, isTitleHolderSameAsLoanProposer,

        // Title Holder
        TitleHolderName, TitleHolderRelationType, TitleHolderRelativeName, TitleHolderResidenceType,
        TitleHolderDoorNumber, TitleHolderStreetName, TitleHolderCityName, TitleHolderMandalName,
        TitleHolderDistrictName, TitleHolderPincode,

        // Property Details
        propertyDoorNumber, nearbyDoor, propertyAssessmentNumber, propertySurveyNumber,
        ExtentOfProperty, propertyType, propertyNature,

        // Property Boundaries
        eastBoundrytype, eastBoundryExtent, eastBoundryOwner,
        westBoundrytype, westBoundryExtent, westBoundryOwner,
        northBoundrytype, northBoundryExtent, northBoundryOwner,
        southBoundrytype, southBoundryExtent, southBoundryOwner,

        // Most Recent Document
        selectDeedType, dateofRegistration, documentNumber, nameofSubregistrarOffice,
        locationOfSubregistrarOffice, subregistrarOfficeMandal, subregistrarOfficeDistrict, subregistrarOfficeLocalAuthority
    } = data;

    const titleHolderValues = [
        TitleHolderName, TitleHolderRelationType, TitleHolderRelativeName,
        TitleHolderResidenceType, TitleHolderDoorNumber, TitleHolderStreetName,
        TitleHolderCityName, TitleHolderMandalName, TitleHolderDistrictName, TitleHolderPincode
    ];

    const sql = `
        INSERT INTO sessions (
            session_id,

            "loanProposerName", "loanProposerRelationType", "loanProposerRelativeName", "loanProposerResidenceType",
            "loanProposerDoorNumber", "loanProposerStreetName", "loanProposerCityName", "loanProposerMandalName",
            "loanProposerDistrictName", "loanProposerPincode", "isTitleHolderSameAsLoanProposer",

            "TitleHolderName", "TitleHolderRelationType", "TitleHolderRelativeName", "TitleHolderResidenceType",
            "TitleHolderDoorNumber", "TitleHolderStreetName", "TitleHolderCityName", "TitleHolderMandalName",
            "TitleHolderDistrictName", "TitleHolderPincode",

            "propertyDoorNumber", "nearbyDoor", "propertyAssessmentNumber", "propertySurveyNumber",
            "ExtentOfProperty", "propertyType", "propertyNature",

            "eastBoundrytype", "eastBoundryExtent", "eastBoundryOwner",
            "westBoundrytype", "westBoundryExtent", "westBoundryOwner",
            "northBoundrytype", "northBoundryExtent", "northBoundryOwner",
            "southBoundrytype", "southBoundryExtent", "southBoundryOwner",

            "selectDeedType", "dateofRegistration", "documentNumber", "nameofSubregistrarOffice",
            "locationOfSubregistrarOffice", "subregistrarOfficeMandal", "subregistrarOfficeDistrict", "subregistrarOfficeLocalAuthority", "current_page"
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
            $13, $14, $15, $16, $17, $18, $19, $20, $21, $22,
            $23, $24, $25, $26, $27, $28, $29,
            $30, $31, $32, $33, $34, $35, $36, $37, $38, $39,
            $40, $41, $42, $43, $44, $45, $46, $47, $48, $49
        )
        ON CONFLICT (session_id) DO UPDATE SET
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

            "TitleHolderName" = EXCLUDED."TitleHolderName",
            "TitleHolderRelationType" = EXCLUDED."TitleHolderRelationType",
            "TitleHolderRelativeName" = EXCLUDED."TitleHolderRelativeName",
            "TitleHolderResidenceType" = EXCLUDED."TitleHolderResidenceType",
            "TitleHolderDoorNumber" = EXCLUDED."TitleHolderDoorNumber",
            "TitleHolderStreetName" = EXCLUDED."TitleHolderStreetName",
            "TitleHolderCityName" = EXCLUDED."TitleHolderCityName",
            "TitleHolderMandalName" = EXCLUDED."TitleHolderMandalName",
            "TitleHolderDistrictName" = EXCLUDED."TitleHolderDistrictName",
            "TitleHolderPincode" = EXCLUDED."TitleHolderPincode",

            "propertyDoorNumber" = EXCLUDED."propertyDoorNumber",
            "nearbyDoor" = EXCLUDED."nearbyDoor",
            "propertyAssessmentNumber" = EXCLUDED."propertyAssessmentNumber",
            "propertySurveyNumber" = EXCLUDED."propertySurveyNumber",
            "ExtentOfProperty" = EXCLUDED."ExtentOfProperty",
            "propertyType" = EXCLUDED."propertyType",
            "propertyNature" = EXCLUDED."propertyNature",

            "eastBoundrytype" = EXCLUDED."eastBoundrytype",
            "eastBoundryExtent" = EXCLUDED."eastBoundryExtent",
            "eastBoundryOwner" = EXCLUDED."eastBoundryOwner",
            "westBoundrytype" = EXCLUDED."westBoundrytype",
            "westBoundryExtent" = EXCLUDED."westBoundryExtent",
            "westBoundryOwner" = EXCLUDED."westBoundryOwner",
            "northBoundrytype" = EXCLUDED."northBoundrytype",
            "northBoundryExtent" = EXCLUDED."northBoundryExtent",
            "northBoundryOwner" = EXCLUDED."northBoundryOwner",
            "southBoundrytype" = EXCLUDED."southBoundrytype",
            "southBoundryExtent" = EXCLUDED."southBoundryExtent",
            "southBoundryOwner" = EXCLUDED."southBoundryOwner",

            "selectDeedType" = EXCLUDED."selectDeedType",
            "dateofRegistration" = EXCLUDED."dateofRegistration",
            "documentNumber" = EXCLUDED."documentNumber",
            "nameofSubregistrarOffice" = EXCLUDED."nameofSubregistrarOffice",
            "locationOfSubregistrarOffice" = EXCLUDED."locationOfSubregistrarOffice",
            "subregistrarOfficeMandal" = EXCLUDED."subregistrarOfficeMandal",
            "subregistrarOfficeDistrict" = EXCLUDED."subregistrarOfficeDistrict",
            "subregistrarOfficeLocalAuthority" = EXCLUDED."subregistrarOfficeLocalAuthority"
        

        RETURNING *;
    `;

    const values = [
        session_id,
        loanProposerName, loanProposerRelationType, loanProposerRelativeName, loanProposerResidenceType,
        loanProposerDoorNumber, loanProposerStreetName, loanProposerCityName, loanProposerMandalName,
        loanProposerDistrictName, loanProposerPincode, isTitleHolderSameAsLoanProposer,

        ...titleHolderValues,

        propertyDoorNumber, nearbyDoor, propertyAssessmentNumber, propertySurveyNumber,
        ExtentOfProperty, propertyType, propertyNature,

        eastBoundrytype, eastBoundryExtent, eastBoundryOwner,
        westBoundrytype, westBoundryExtent, westBoundryOwner,
        northBoundrytype, northBoundryExtent, northBoundryOwner,
        southBoundrytype, southBoundryExtent, southBoundryOwner,

        selectDeedType, dateofRegistration, documentNumber, nameofSubregistrarOffice,
        locationOfSubregistrarOffice, subregistrarOfficeMandal, subregistrarOfficeDistrict, subregistrarOfficeLocalAuthority
    ];

    const result = await pool.query(sql, values);
    return result.rows[0];
};

const getSessionById = async (session_id) => {
    const sql = `SELECT * FROM sessions WHERE session_id = $1;`;
    const result = await pool.query(sql, [session_id]);
    return result.rows[0] || null;
};

module.exports = {
    createOrUpdateSession,
    getSessionById,
};
