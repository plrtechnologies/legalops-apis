const { getSessionsByUserId } = require('../models/sessionModel');
const { getLinkDocumentsByUserId } = require('../models/linkdocModel');
const { getCurrentPageName } = require('../utils/sessionHelpers');
const { getCurrentLinkPageName, normalizeDeedType, linkPageFieldMap } = require('../utils/linkDocHelpers');

const resumeFullSessionByUserId = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const sessions = await getSessionsByUserId(user_id);
    const linkDocuments = await getLinkDocumentsByUserId(user_id);

    // Step 1: Clean and group link documents by session_id
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
        user_id: linkDoc.user_id, // ✅ Fix: Include user_id here
        current_page,
        ...filtered
      };

      if (!cleanedLinkDocumentsMap[linkDoc.session_id]) {
        cleanedLinkDocumentsMap[linkDoc.session_id] = [];
      }

      cleanedLinkDocumentsMap[linkDoc.session_id].push(cleaned);
    });

    // Step 2: Attach cleaned link documents into each session
    const cleanedSessions = sessions.map((session) => {
      const current_page = getCurrentPageName(session);
      const sessionId = session.session_id;
      const relatedLinkDocs = cleanedLinkDocumentsMap[sessionId];

      return {
        session_id: sessionId,
        current_page,
        user_id: session.user_id, // Optional: Only if needed at session level
        ...session,
        link_documents: relatedLinkDocs || null
      };
    });

    res.status(200).json({
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
