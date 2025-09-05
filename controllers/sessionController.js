const {
  createOrUpdateSession,
  getSessionById,
  getSessionsByName,
  getSessionsByUserId
} = require('../models/sessionModel');

// Map of logical page names to their fields
const pageFieldMap = {
  loanProposerDetails: ['loanProposerName', 'loanProposerRelationType', 'loanProposerRelativeName', 'loanProposerResidenceType',
      'loanProposerDoorNumber', 'loanProposerStreetName', 'loanProposerCityName', 'loanProposerMandalName',
      'loanProposerDistrictName', 'loanProposerPincode', 'isTitleHolderSameAsLoanProposer'],
  titleHolderDetails: ['titleHolderName', 'titleHolderRelationType', 'titleHolderRelativeName',
      'titleHolderResidenceType', 'titleHolderDoorNumber', 'titleHolderStreetName',
      'titleHolderCityName', 'titleHolderMandalName', 'titleHolderDistrictName', 'titleHolderPincode'],
  propertyDetails: ['propertyDoorNumber', 'nearbyDoor', 'propertyAssessmentNumber', 'propertySurveyNumber',
      'extentOfProperty', 'propertyType', 'propertyNature'],
  propertyBoundaries: ['eastBoundaryType', 'eastBoundaryExtent', 'eastBoundaryOwner',
      'westBoundaryType', 'westBoundaryExtent', 'westBoundaryOwner',
      'northBoundaryType', 'northBoundaryExtent', 'northBoundaryOwner',
      'southBoundaryType', 'southBoundaryExtent', 'southBoundaryOwner'],
  mostRecentDocuments: ['selectDeedType', 'dateOfRegistration', 'documentNumber', 'nameOfSubRegistrarOffice',
      'locationOfSubRegistrarOffice', 'subRegistrarOfficeMandal', 'subRegistrarOfficeDistrict', 'subRegistrarOfficeLocalAuthority']
};

// Determine current page based on missing or empty fields
const getCurrentPageName = (sessionData) => {
  for (const [pageName, fields] of Object.entries(pageFieldMap)) {
    // ⛔ Skip title holder page if not applicable
    if (
      pageName === 'titleHolderDetails' &&
      String(sessionData.isTitleHolderSameAsLoanProposer).toLowerCase() === 'true'
    ) {
      continue; // Skip this page
    }

    const allFilled = fields.every((field) => {
      const value = sessionData[field];
      return value !== undefined && value !== null && value !== '';
    });

    if (!allFilled) return pageName;
  }

  return 'complete';
};

// Filter session fields up to (but not including) current page
const filterAllFilledFields = (session) => {
  const filtered = {};
  for (const [pageName, fields] of Object.entries(pageFieldMap)) {
    if (
      pageName === 'titleHolderDetails' &&
      String(session.isTitleHolderSameAsLoanProposer).toLowerCase() === 'true'
    ) {
      continue;
    }

    fields.forEach((field) => {
      const value = session[field];
      if (value !== undefined && value !== null && value !== '') {
        filtered[field] = value;
      }
    });
  }
  return filtered;
};

// CREATE DOCUMENT (full submission) - returns current_page + all data
const createSession = async (req, res) => {
  try {
    // Don't allow client to send current_page — remove if present
    if ('current_page' in req.body) delete req.body.current_page;

    const result = await createOrUpdateSession(req.body);
    const updatedSession = await getSessionById(result.session_id);


    const current_page = getCurrentPageName(session);
    const data = filterAllFilledFields(session);
    

    return res.status(200).json({
      message: 'Document created',
      session_id: updatedSession.session_id,
      data: updatedSession,
    });
  } catch (err) {
    console.error('createDocument error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// RESUME session (GET by loanproposername) - returns current_page + filtered data only
const resumeSession = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Query param "name" is required' });
  }

  try {
    const sessions = await getSessionsByName(name);

    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ error: 'Session not found for this username' });
    }

    const session = sessions[0]; // return first match

    const current_page = getCurrentPageName(session);
const data = filterAllFilledFields(session);


    return res.status(200).json({
      session_id: session.session_id,
      current_page,
      data,
    });
  } catch (err) {
    console.error('resumeSession error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET session by session_id - returns full session object (no filtering)
const getSession = async (req, res) => {
  try {
    const { session_id } = req.params;

    if (!session_id) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const session = await getSessionById(session_id);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    return res.status(200).json({ data: session });
  } catch (error) {
    console.error('getSession error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

//GET session by email
const resumeSessionByEmail = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Query param "email" is required' });
  }

  try {
    const sessions = await getSessionsByUserId(email);

    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ error: 'No sessions found for this email' });
    }

    const sessionsWithPageData = sessions.map((session) => {
      const current_page = getCurrentPageName(session);
      const data = filterAllFilledFields(session);
      

      return {
        session_id: session.session_id,
        current_page,
        data,
      };
    });

    return res.status(200).json(sessionsWithPageData);
  } catch (err) {
    console.error('resumeSessionByEmail error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  createSession,
  resumeSession,
  getSession,
  resumeSessionByEmail
};
