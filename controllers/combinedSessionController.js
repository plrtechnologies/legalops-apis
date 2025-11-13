const { getSessionsByUserId } = require('../models/sessionModel');
const { getLinkDocumentsByUserId } = require('../models/linkdocModel');
const { getCurrentPageName } = require('../utils/sessionHelpers');
const { getCurrentLinkPageName, normalizeDeedType, linkPageFieldMap } = require('../utils/linkDocHelpers');

/**
 * Resume full session by user ID
 * - Fetches session data (loan proposer name instead of user_name)
 * - Fetches linked documents
 * - Groups and merges both for frontend
 */
const resumeFullSessionByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    // ✅ Step 1: Fetch sessions
    const sessions = await getSessionsByUserId(user_id);
    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ message: 'No sessions found for this user' });
    }

    // ✅ Step 2: Fetch link documents
    const linkDocuments = (await getLinkDocumentsByUserId(user_id)) || [];

    // ✅ Step 3: Map link documents by session_id
    const cleanedLinkDocumentsMap = linkDocuments.reduce((acc, linkDoc) => {
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

      // 🧹 Filter only non-empty fields
      const filtered = { selectDeedType: linkDoc.selectDeedType };
      relevantFields.forEach(field => {
        const value = linkDoc[field];
        if (value !== undefined && value !== null && value !== '') {
          filtered[field] = value;
        }
      });

      const current_page = getCurrentLinkPageName(linkDoc);

      const cleaned = {
        session_id: linkDoc.session_id,
        user_id: linkDoc.user_id,
        current_page,
        ...filtered
      };

      // Group by session_id
      if (!acc[linkDoc.session_id]) acc[linkDoc.session_id] = [];
      acc[linkDoc.session_id].push(cleaned);

      return acc;
    }, {});

    // ✅ Step 4: Attach link docs to sessions
    const cleanedSessions = sessions.map(session => {
      const current_page = getCurrentPageName(session);
      const relatedLinkDocs = cleanedLinkDocumentsMap[session.session_id] || [];

      return {
        session_id: session.session_id,
        user_id: session.user_id,
        loanProposerName: session.loanProposerName || null, // clear naming
        current_page,
        ...session,
        link_documents: relatedLinkDocs
      };
    });

    // ✅ Step 5: Send structured response
    res.status(200).json({
      user_id,
      loanProposerName: sessions[0].loanProposerName || null,
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
