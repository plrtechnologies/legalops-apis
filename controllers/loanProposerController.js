const loanProposerModel = require('../models/loanProposerModel');

const addLoanProposer = async (req, res) => {
   
    const { session_id, loanProposerName, loanProposerRelationType, loanProposerRelativeName, loanProposerResidenceType, loanProposerDoorNumber, loanProposerStreetName, loanProposerCityName, loanProposerMandalName, loanProposerDistrictName, loanProposerPincode } = req.body;
   // Check if the mandatory fields are provided
   if ( !session_id || !loanProposerName || !loanProposerRelationType || !loanProposerRelativeName || !loanProposerResidenceType || !loanProposerCityName || !loanProposerMandalName || !loanProposerDistrictName || !loanProposerPincode) {
    return res.status(400).send('loanProposerName, loanProposerRelationType, loanProposerRelativeName, loanProposerResidenceType, loanProposerCityName, loanProposerMandalName, loanProposerDistrictName and loanProposerPincode are required');
}

// Validate loanProposerRelationType (should be S/O, W/O, D/O, C/O or H/O)
const validRelationTypes = ['S/O', 'W/O', 'D/O', 'C/O', 'H/O'];
if (!validRelationTypes.includes(loanProposerRelationType)) {
    return res.status(400).send('Invalid loanProposerRelationType. Must be S/O, W/O, D/O, C/O or H/O.');
}

// Validate loanProposerResidenceType (should be Flat or House)
const validResidenceTypes = ['Flat', 'House'];
if (!validResidenceTypes.includes(loanProposerResidenceType)) {
    return res.status(400).send('Invalid loanProposerResidenceType. Must be Flat or House.');
}

try {
    // Check if name is provided, if not assign it as null or any default value
    const loanproposer = await loanProposerModel.createLoanProposer([
        session_id,
        loanProposerName, // if 'name' is not provided, it will default to null
        loanProposerRelationType,
        loanProposerRelativeName,
        loanProposerResidenceType,
        loanProposerDoorNumber || null,
        loanProposerStreetName || null,
        loanProposerCityName,
        loanProposerMandalName,
        loanProposerDistrictName,
        loanProposerPincode
    ]);
    
    res.send({ loanproposer, message: 'Loan proposer added successfully!' });
} catch (err) {
    console.error('Error adding loan proposer:', err.stack);
    res.status(500).send('Error adding loan proposer');
}
};

const retrieveLoanProposers = async (req, res) => {
    try {
        const loanProposers = await loanProposerModel.getLoanProposers();
        res.send(loanProposers);
    } catch (err) {
        console.error('Error retrieving loan proposers:', err.stack);
        res.status(500).send('Error retrieving loan proposers');
    }
};

module.exports = {
    addLoanProposer,
    retrieveLoanProposers,
};
