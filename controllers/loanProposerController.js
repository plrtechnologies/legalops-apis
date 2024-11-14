const loanProposerModel = require('../models/loanProposerModel');

const addLoanProposer = async (req, res) => {
    const { name, relation_type, relative_name, residence_type, door_number, street_name, city_name, mandal_name, district_name, pincode } = req.body;
 /* 
 // Check if all required fields are provided
 if (!name || !relation_type || !relative_name || !residence_type || !door_number || !street_name || !city_name || !mandal_name || !district_name || !pincode) {
    return res.status(400).send('All fields are required');
}
*/
    try {
        const session_id = await loanProposerModel.createLoanProposer([name, relation_type, relative_name, residence_type, door_number, street_name, city_name, mandal_name, district_name, pincode]);
        res.send({ session_id, message: 'Loan proposer added successfully!' });
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
