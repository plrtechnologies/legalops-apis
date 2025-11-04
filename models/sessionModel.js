const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Bypass cert validation for self-signed certs
  },
});

const createOrUpdateSession = async (data) => {
  // Convert to boolean safely
  const isSame = String(data.isTitleHolderSameAsLoanProposer).toLowerCase() === 'true';

  // Nullify title holder fields if same as loan proposer
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

  // 🆕 STEP 1: Ensure unique session_id (avoid overwriting old data)
  let finalSessionId = data.session_id;
  const existing = await pool.query('SELECT 1 FROM sessions WHERE session_id = $1', [finalSessionId]);
  if (existing.rows.length > 0) {
    finalSessionId = `${data.session_id}_${Date.now()}`; // auto-create unique id
    console.log(`🆕 New unique session_id generated: ${finalSessionId}`);
  }
  data.session_id = finalSessionId;
  // 🆕 END STEP 1

  // Destructure after modifying data
  const {
    session_id, user_id,

    // Loan Proposer
    loanProposerName, loanProposerRelationType, loanProposerRelativeName,
    loanProposerResidenceType, loanProposerDoorNumber, loanProposerStreetName,
    loanProposerCityName, loanProposerMandalName, loanProposerDistrictName, loanProposerPincode,
    isTitleHolderSameAsLoanProposer,

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

    // Deed / Registration Details
    selectDeedType, dateOfRegistration, documentNumber, nameOfSubRegistrarOffice,
    locationOfSubRegistrarOffice, subRegistrarOfficeMandal, subRegistrarOfficeDistrict, subRegistrarOfficeLocalAuthority
  } = data;

  const titleHolderValues = [
    titleHolderName, titleHolderRelationType, titleHolderRelativeName,
    titleHolderResidenceType, titleHolderDoorNumber, titleHolderStreetName,
    titleHolderCityName, titleHolderMandalName, titleHolderDistrictName, titleHolderPincode,
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
      "locationOfSubRegistrarOffice", "subRegistrarOfficeMandal", "subRegistrarOfficeDistrict", "subRegistrarOfficeLocalAuthority",
      "created_at"
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
      $21, $22, $23, $24, $25, $26, $27, $28, $29,
      $30, $31, $32, $33, $34, $35, $36, $37, $38, $39,
      $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, NOW()
    )
    RETURNING *;
  `;

  const values = [
    data.session_id, user_id,
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
    locationOfSubRegistrarOffice, subRegistrarOfficeMandal, subRegistrarOfficeDistrict, subRegistrarOfficeLocalAuthority,
  ];

  const result = await pool.query(sql, values);
  return result.rows[0];
};

// ✅ Fetch single session by session_id
const getSessionsBySessionId = async (session_id) => {
  const sql = `
    SELECT s.*, u.name AS user_name
    FROM sessions s
    LEFT JOIN users u ON s.user_id = u.user_id
    WHERE s.session_id = $1;
  `;
  const result = await pool.query(sql, [session_id]);
  return result.rows[0] || null;
};

// ✅ Fetch sessions by loan proposer name
const getSessionsByName = async (name) => {
  const sql = `SELECT * FROM sessions WHERE "loanProposerName" = $1;`;
  const result = await pool.query(sql, [name]);
  return result.rows;
};

// ✅ Fetch all sessions for a user
const getSessionsByUserId = async (user_id) => {
  const sql = `
    SELECT *
    FROM sessions
    WHERE user_id = $1
    ORDER BY created_at DESC;
  `;
  const result = await pool.query(sql, [user_id]);
  return result.rows;
};

module.exports = {
  createOrUpdateSession,
  getSessionsBySessionId,
  getSessionsByName,
  getSessionsByUserId,
};
