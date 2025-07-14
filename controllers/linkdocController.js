const {
    createOrUpdateLinkDocument,
    getLinkDocumentBySessionId,
    getLinkDocumentsByUserId,
    getLinkDocumentsByName,
  } = require('../models/linkdocModel');

  // 🔧 Normalize selectDeedType to match internal mapping
const normalizeDeedType = (type) => {
    const lower = String(type || '').toLowerCase();
    const map = {
      'ecdetails': 'ec',
      'giftdeed': 'giftdeed',
      'mortgagedeed': 'mortgagedeed',
      'noticedocument': 'noticedocument',
      'receiptdocument': 'receiptdocument',
      'partitiondeed': 'partitiondeed',
      'relinquishdeed': 'relinquishdeed',
      'saledeed': 'saledeed',
      'willdeed': 'willdeed',
      'ec': 'ec',
    };
    return map[lower] || '';
  };
  
  
  // Map of logical page names to link document fields
  const linkPageFieldMap = {
    selectDeed: ['selectDeedType'],
    ecDetails: ['ecDocType', 'ecIssuingAuthority', 'ecStatementNumber', 'fromDate', 'toDate'],
    giftDeed: ['giftDocType', 'donorName', 'doneeName', 'giftRegistrationDate', 'giftDocNumber', 'giftIssuingAuthority'],
    noticeDocument: ['noticeDocType', 'noticeIssuingAuthority', 'noticeDoorNumberOnReceipt', 'noticeAssessmentNumberOnReceipt', 'amountDue', 'amountDueInFavourOf'],
    receiptDocument: ['receiptDocType', 'receiptIssuingAuthority', 'receiptDoorNumberOnReceipt', 'receiptAssessmentNumberOnReceipt', 'amountPaid', 'amountPaidInFavourOf'],
    mortgageDeed: ['mortgageDocType', 'mortgagorName', 'mortgageeName', 'mortgageRegistrationDate', 'mortgageDocNumber', 'mortgageIssuingAuthority'],
    partitionDeed: ['partitionDocType', 'partitionerName', 'partitionRecipientName', 'partitionRegistrationDate', 'partitionDocNumber', 'partitionIssuingAuthority'],
    relinquishDeed: ['relinquishDocType', 'relinquisherName', 'relinquishRecipientName', 'relinquishRegistrationDate', 'relinquishDocNumber', 'relinquishIssuingAuthority'],
    saleDeed: ['saleDocType', 'sellerName', 'buyerName', 'saleRegistrationDate', 'saleDocNumber', 'saleIssuingAuthority'],
    willDeed: ['willDocType', 'testatorName', 'beneficiaryName', 'willRegistrationDate', 'willDocNumber', 'willIssuingAuthority']
  };
  
  
  // Determine which link page the user should continue from (with selectDeedType handling)
  const getCurrentLinkPageName = (linkdocData) => {
    const deedType = normalizeDeedType(linkdocData.selectDeedType);
  
    for (const [pageName, fields] of Object.entries(linkPageFieldMap)) {
      // Skip irrelevant deed pages
      if (
        (pageName === 'ecDetails' && deedType !== 'ec') ||
        (pageName === 'giftDeed' && deedType !== 'giftdeed') ||
        (pageName === 'mortgageDeed' && deedType !== 'mortgagedeed') ||
        (pageName === 'noticeDocument' && deedType !== 'noticedocument') ||
        (pageName === 'receiptDocument' && deedType !== 'receiptdocument') ||
        (pageName === 'partitionDeed' && deedType !== 'partitiondeed') ||
        (pageName === 'relinquishDeed' && deedType !== 'relinquishdeed') ||
        (pageName === 'saleDeed' && deedType !== 'saledeed') ||
        (pageName === 'willDeed' && deedType !== 'willdeed')
      ) {
        continue;
      }
      
      const allFilled = fields.every((field) => {
        const value = linkdocData[field];
        return value !== undefined && value !== null && value !== '';
      });
  
      if (!allFilled) return pageName;
    }
  
    return 'complete';
  };
  
  
  // Collect only data up to a specific page (skip irrelevant deed sections)
  const filterLinkDocFieldsUpToPage = (linkdoc, currentPageName) => {
    const filtered = {
      selectDeedType: linkdoc.selectDeedType
    };
    const deedType = String(linkdoc.selectDeedType || '').toLowerCase();
  
    for (const [pageName, fields] of Object.entries(linkPageFieldMap)) {
      // Skip unrelated deed types
      if (
        (pageName === 'ecDetails' && deedType !== 'ec') ||
        (pageName === 'giftDeed' && deedType !== 'giftdeed') ||
        (pageName === 'mortgageDeed' && deedType !== 'mortgagedeed') ||
        (pageName === 'noticeDocument' && deedType !== 'noticedocument') ||
        (pageName === 'receiptDocument' && deedType !== 'receiptdocument') ||
        (pageName === 'partitionDeed' && deedType !== 'partitiondeed') ||
        (pageName === 'relinquishDeed' && deedType !== 'relinquishdeed') ||
        (pageName === 'saleDeed' && deedType !== 'saledeed') ||
        (pageName === 'willDeed' && deedType !== 'willdeed')
      ) {
        continue;
      }
      
      fields.forEach((field) => {
        const value = linkdoc[field];
        if (value !== undefined && value !== null && value !== '') {
          filtered[field] = value;
        }
      });
  
      if (pageName === currentPageName) break;
    }
  
    return filtered;
  };
    
 // ✅ Create/Update document
const addLinkDocument = async (req, res) => {
    try {
      let { selectDeedType } = req.body;
  
      if (!selectDeedType) {
        return res.status(400).json({ error: 'Missing selectDeedType in request' });
      }
  
      // Normalize before saving
      selectDeedType = normalizeDeedType(selectDeedType);
      req.body.selectDeedType = selectDeedType;
  
      const result = await createOrUpdateLinkDocument(req.body);
      const updated = await getLinkDocumentBySessionId(result.session_id);
  
      const current_page = getCurrentLinkPageName(updated);
      const data = filterLinkDocFieldsUpToPage(updated, current_page);
  
      return res.status(200).json({
        session_id: updated.session_id,
        data
      });
  
    } catch (err) {
      console.error('addLinkDocument error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // ✅ Get by session ID
  const getLinkDocument = async (req, res) => {
    try {
      const { session_id } = req.params;
      const result = await getLinkDocumentBySessionId(session_id);
  
      if (!result) {
        return res.status(404).json({ message: 'Link document not found' });
      }
  
      return res.status(200).json(result);
    } catch (err) {
      console.error('getLinkDocument error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // ✅ Get all by email/user_id
  const resumeLinkSessionsByEmail = async (req, res) => {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: 'Query param "email" is required' });
  
    try {
      const sessions = await getLinkDocumentsByUserId(email);
      if (!sessions.length) return res.status(404).json({ error: 'No link sessions found for this email' });
  
      const result = sessions.map(session => {
        const current_page = getCurrentLinkPageName(session);
        const data = filterLinkDocFieldsUpToPage(session, current_page);
  
        return {
          session_id: session.session_id,
          selectDeedType: session.selectDeedType,
          current_page,
          data
        };
      });
  
      return res.status(200).json(result);
    } catch (err) {
      console.error('resumeLinkSessionsByEmail error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getLinkDocsByName = async (req, res) => {
    const { name } = req.query;
    if (!name) return res.status(400).json({ error: 'Query param "name" is required' });
  
    try {
      const linkdocs = await getLinkDocumentsByName(name);
  
      if (linkdocs.length === 0) {
        return res.status(404).json({ error: 'No link documents found for that loan proposer name' });
      }
  
      const results = linkdocs.map(doc => {
        const current_page = getCurrentLinkPageName(doc);
        const data = filterLinkDocFieldsUpToPage(doc, current_page);
  
        return {
          session_id: doc.session_id,
          selectDeedType: doc.selectDeedType,
          current_page,
          data
        };
      });
  
      return res.status(200).json(results);
    } catch (err) {
      console.error('getLinkDocsByName error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  
  module.exports = {
    addLinkDocument,
    getLinkDocument,
    resumeLinkSessionsByEmail,
    getLinkDocsByName
  };
  