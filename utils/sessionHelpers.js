// utils/sessionHelpers.js

const pageFieldMap = {
  loanProposerDetails: [
    'loanProposerName', 'loanProposerRelationType', 'loanProposerRelativeName', 'loanProposerResidenceType',
    'loanProposerDoorNumber', 'loanProposerStreetName', 'loanProposerCityName', 'loanProposerMandalName',
    'loanProposerDistrictName', 'loanProposerPincode', 'isTitleHolderSameAsLoanProposer'
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
    'locationOfSubRegistrarOffice', 'subRegistrarOfficeMandal',
    'subRegistrarOfficeDistrict', 'subRegistrarOfficeLocalAuthority'
  ]
};

/**
 * getCurrentPageName()
 * - Determines which page the user should go to next when resuming.
 * - Skips Title Holder page if "isTitleHolderSameAsLoanProposer" is true.
 * - Returns "complete" if all pages are filled.
 */
const getCurrentPageName = (sessionData) => {
  const isSame = String(sessionData.isTitleHolderSameAsLoanProposer || '').toLowerCase() === 'true';

  const pageOrder = [
    'loanProposerDetails',
    ...(isSame ? [] : ['titleHolderDetails']),
    'propertyDetails',
    'propertyBoundaries',
    'mostRecentDocuments'
  ];

  for (const pageName of pageOrder) {
    const fields = pageFieldMap[pageName];
    if (!fields) continue;

    const allFilled = fields.every((field) => {
      const value = sessionData[field];
      return value !== undefined && value !== null && value !== '';
    });

    if (!allFilled) {
      return pageName; // first unfilled page → resume here
    }
  }

  return 'complete'; // all pages filled
};

module.exports = {
  getCurrentPageName
};
