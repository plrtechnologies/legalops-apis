// utils/linkDocHelpers.js

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
  
  const normalizeDeedType = (type) => {
    const lower = String(type || '').toLowerCase();
    const map = {
      ecdetails: 'ec',
      giftdeed: 'giftdeed',
      mortgagedeed: 'mortgagedeed',
      noticedocument: 'noticedocument',
      receiptdocument: 'receiptdocument',
      partitiondeed: 'partitiondeed',
      relinquishdeed: 'relinquishdeed',
      saledeed: 'saledeed',
      willdeed: 'willdeed',
      ec: 'ec',
    };
    return map[lower] || '';
  };
  
  const getCurrentLinkPageName = (linkdoc) => {
    const normalizedType = normalizeDeedType(linkdoc.selectDeedType);
  
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
  
    if (!fields) return 'selectDeed'; // default if invalid or missing
  
    const allFilled = fields.every((field) => {
      const value = linkdoc[field];
      return value !== undefined && value !== null && value !== '';
    });
  
    return allFilled ? 'complete' : normalizedType + 'Deed';
  };
  
  module.exports = {
    getCurrentLinkPageName,
    normalizeDeedType,
    linkPageFieldMap
  };
  