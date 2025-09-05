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
  
  const getCurrentPageName = (sessionData) => {
    for (const [pageName, fields] of Object.entries(pageFieldMap)) {
      if (
        pageName === 'titleHolderDetails' &&
        String(sessionData.isTitleHolderSameAsLoanProposer).toLowerCase() === 'true'
      ) {
        continue;
      }
  
      const allFilled = fields.every((field) => {
        const value = sessionData[field];
        return value !== undefined && value !== null && value !== '';
      });
  
      if (!allFilled) return pageName;
    }
  
    return 'complete';
  };
  
  module.exports = {
    getCurrentPageName
  };
  