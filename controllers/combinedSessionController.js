const { getSessionsByUserId } = require('../models/sessionModel');
const { getLinkDocumentsByUserId } = require('../models/linkdocModel');
const { getCurrentPageName } = require('../utils/sessionHelpers');
const { getCurrentLinkPageName, normalizeDeedType, linkPageFieldMap } = require('../utils/linkDocHelpers');

/**
 * Resume full session by user ID
 * - Fetches session data (with loan proposer name instead of user_name)
 * - Fetches linked documents
 * - Groups and cleans both for frontend consumption
 */
const resumeFullSessionByUserId = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    // ✅ Step 1: Fetch sessions (no user_name join)
    const sessions = await getSessionsByUserId(user_id);

    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ message: 'No sessions found for this user' });
    }

    // ✅ Step 2: Fetch linked documents
    const linkDocuments = await getLinkDocumentsByUserId(user_id);

    // ✅ Step 3: Group and clean link documents
    const cleanedLinkDocumentsMap = {};

    linkDocuments.forEach(linkDoc => {
      const deedType = normalizeDeedType(linkDoc.selectDeedType);

      const deedKeyMap = {
        ec: 'ecDetails',
        giftdeed: 'giftDeed',
        mortgagedeed: 'mortgageDeed',
        noticedocument: 'noticeDocument',
        receiptdocument: 'receiptDocument',
        partitiondeed: 'partitionDeed',
        relinquishdeed: 'relinquishDeed',
        saledeed: 'saleDeed',
        willdeed: 'willDeed'
      };

      const deedKey = deedKeyMap[deedType];
      const relevantFields = linkPageFieldMap[deedKey] || [];

      const filtered = { selectDeedType: linkDoc.selectDeedType };

      relevantFields.forEach(field => {
        if (linkDoc[field] !== null && linkDoc[field] !== undefined && linkDoc[field] !== '') {
          filtered[field] = linkDoc[field];
        }
      });

      const current_page = getCurrentLinkPageName(linkDoc);

      const cleaned = {
        session_id: linkDoc.session_id,
        user_id: linkDoc.user_id,
        current_page,
        ...filtered
      };

      if (!cleanedLinkDocumentsMap[linkDoc.session_id]) {
        cleanedLinkDocumentsMap[linkDoc.session_id] = [];
      }

      cleanedLinkDocumentsMap[linkDoc.session_id].push(cleaned);
    });

    // ✅ Step 4: Attach link docs to sessions
    const cleanedSessions = sessions.map(session => {
      const current_page = getCurrentPageName(session);
      const sessionId = session.session_id;
      const relatedLinkDocs = cleanedLinkDocumentsMap[sessionId];

      return {
        session_id: sessionId,
        user_id: session.user_id,
        name: session.loanProposerName || null, // ✅ Use loan proposer’s name for frontend display
        current_page,
        ...session,
        link_documents: relatedLinkDocs || []
      };
    });

    // ✅ Step 5: Send structured response
    res.status(200).json({
      user_id,
      name: sessions[0].loanProposerName || null, // ✅ Show loan proposer’s name here too
      total_sessions: cleanedSessions.length,
      sessions: cleanedSessions
    });

  } catch (error) {
    console.error('Error in resumeFullSessionByUserId:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  resumeFullSessionByUserId
};
