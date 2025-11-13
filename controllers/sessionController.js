const {
  createOrUpdateSession,
  getSessionsBySessionId,
  getSessionsByName,
  getSessionsByUserId
} = require('../models/sessionModel');

// Map of logical page names to their fields
const pageFieldMap = {
  loanProposerDetails: [
    'loanProposerName', 'loanProposerRelationType', 'loanProposerRelativeName',
    'loanProposerResidenceType', 'loanProposerDoorNumber', 'loanProposerStreetName',
    'loanProposerCityName', 'loanProposerMandalName', 'loanProposerDistrictName',
    'loanProposerPincode', 'isTitleHolderSameAsLoanProposer'
  ],
  titleHolderDetails: [
    'titleHolderName', 'titleHolderRelationType', 'titleHolderRelativeName',
    'titleHolderResidenceType', 'titleHolderDoorNumber', 'titleHolderStreetName',
    'titleHolderCityName', 'titleHolderMandalName', 'titleHolderDistrictName', 'titleHolderPincode'
  ],
  propertyDetails: [
    'propertyDoorNumber', 'nearbyDoor', 'propertyAssessmentNumber', 'propertySurveyNumber',
    'extentOfProperty', 'propertyType', 'propertyNature'
  ],
  propertyBoundaries: [
    'eastBoundaryType', 'eastBoundaryExtent', 'eastBoundaryOwner',
    'westBoundaryType', 'westBoundaryExtent', 'westBoundaryOwner',
    'northBoundaryType', 'northBoundaryExtent', 'northBoundaryOwner',
    'southBoundaryType', 'southBoundaryExtent', 'southBoundaryOwner'
  ],
  mostRecentDocuments: [
    'selectDeedType', 'dateOfRegistration', 'documentNumber', 'nameOfSubRegistrarOffice',
    'locationOfSubRegistrarOffice', 'subRegistrarOfficeMandal', 'subRegistrarOfficeDistrict',
    'subRegistrarOfficeLocalAuthority'
  ]
};

// Determine current page based on missing fields
const getCurrentPageName = (sessionData) => {
  for (const [pageName, fields] of Object.entries(pageFieldMap)) {
    if (
      pageName === 'titleHolderDetails' &&
      String(sessionData.isTitleHolderSameAsLoanProposer).toLowerCase() === 'true'
    ) continue;

    const allFilled = fields.every((field) => {
      const value = sessionData[field];
      return value !== undefined && value !== null && value !== '';
    });

    if (!allFilled) return pageName;
  }
  return 'complete';
};

// Filter only filled fields
const filterAllFilledFields = (session) => {
  const filtered = {};
  for (const [pageName, fields] of Object.entries(pageFieldMap)) {
    if (
      pageName === 'titleHolderDetails' &&
      String(session.isTitleHolderSameAsLoanProposer).toLowerCase() === 'true'
    ) continue;

    fields.forEach((field) => {
      const value = session[field];
      if (value !== undefined && value !== null && value !== '') {
        filtered[field] = value;
      }
    });
  }
  return filtered;
};

// ✅ CREATE OR UPDATE SESSION
const createSession = async (req, res) => {
  try {
    if ('current_page' in req.body) delete req.body.current_page;

    const result = await createOrUpdateSession(req.body);
    const updatedSession = await getSessionsBySessionId(result.session_id);

    const current_page = getCurrentPageName(updatedSession);
    const data = filterAllFilledFields(updatedSession);

    return res.status(200).json({
      message: 'Session created or updated successfully',
      session_id: updatedSession.session_id,
      current_page,
      data
    });
  } catch (err) {
    console.error('createSession error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ GET BY LOAN PROPOSER NAME
const getSessionByName = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Query param "name" is required' });
  }

  try {
    const sessions = await getSessionsByName(name);
    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ error: 'Session not found for this username' });
    }

    const session = sessions[0];
    const current_page = getCurrentPageName(session);
    const data = filterAllFilledFields(session);

    return res.status(200).json({
      session_id: session.session_id,
      current_page,
      data
    });
  } catch (err) {
    console.error('getSessionByName error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ GET BY SESSION ID
const getSessionByID = async (req, res) => {
  try {
    const { session_id } = req.params;
    if (!session_id) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const session = await getSessionsBySessionId(session_id);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    return res.status(200).json({ data: session });
  } catch (error) {
    console.error('getSessionByID error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ GET BY USER ID
const getSessionByUserId = async (req, res) => {
  const { user_id } = req.params; // 🔥 changed from query to params

  if (!user_id) {
    return res.status(400).json({ error: 'Path param "user_id" is required' });
  }

  try {
    const sessions = await getSessionsByUserId(user_id);
    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ error: 'No sessions found for this user_id' });
    }

    const sessionsWithPageData = sessions.map((session) => {
      const current_page = getCurrentPageName(session);
      const data = filterAllFilledFields(session);

      return {
        session_id: session.session_id,
        current_page,
        data
      };
    });

    return res.status(200).json(sessionsWithPageData);
  } catch (err) {
    console.error('getSessionByUserId error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createSession,
  getSessionByName,
  getSessionByID,
  getSessionByUserId
};
