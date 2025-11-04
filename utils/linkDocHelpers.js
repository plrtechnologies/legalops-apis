// utils/linkDocHelpers.js

// 🔹 1. Map of deed types to their form fields
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

// 🔹 2. Normalize deed type consistently
const normalizeDeedType = (type) => {
  const lower = String(type || '').toLowerCase().trim();

  const map = {
    ecdetails: 'ec',
    ec: 'ec',
    giftdeed: 'giftdeed',
    mortgagedeed: 'mortgagedeed',
    noticedocument: 'noticedocument',
    receiptdocument: 'receiptdocument',
    partitiondeed: 'partitiondeed',
    relinquishdeed: 'relinquishdeed',
    saledeed: 'saledeed',
    willdeed: 'willdeed'
  };

  return map[lower] || '';
};

/**
 * 🔹 3. getCurrentLinkPageName(linkdoc)
 * Determines which link document page to resume.
 * - Step 1: If selectDeedType not chosen → go to selectDeed page.
 * - Step 2: If selected deed type partially filled → go to that specific deed page.
 * - Step 3: If all fields filled → return "complete".
 */
const getCurrentLinkPageName = (linkdoc) => {
  // Step 1: Deed not selected yet
  if (!linkdoc.selectDeedType) {
    return 'selectDeed';
  }

  const normalizedType = normalizeDeedType(linkdoc.selectDeedType);

  // Step 2: Map normalized deed type to corresponding field list
  const fieldCheckMap = {
    ec: linkPageFieldMap.ecDetails,
    giftdeed: linkPageFieldMap.giftDeed,
    mortgagedeed: linkPageFieldMap.mortgageDeed,
    noticedocument: linkPageFieldMap.noticeDocument,
    receiptdocument: linkPageFieldMap.receiptDocument,
    partitiondeed: linkPageFieldMap.partitionDeed,
    relinquishdeed: linkPageFieldMap.relinquishDeed,
    saledeed: linkPageFieldMap.saleDeed,
    willdeed: linkPageFieldMap.willDeed
  };

  const fields = fieldCheckMap[normalizedType];

  // Step 3: Invalid or unmapped deed type
  if (!fields) return 'selectDeed';

  // Step 4: Check which fields are filled
  const allFilled = fields.every((field) => {
    const value = linkdoc[field];
    return value !== undefined && value !== null && value !== '';
  });

  // Step 5: If incomplete → go back to that deed page; if done → complete
  return allFilled ? 'complete' : normalizedType + 'Deed';
};

module.exports = {
  getCurrentLinkPageName,
  normalizeDeedType,
  linkPageFieldMap
};
