const loanProposerModel = require('../models/loanProposerModel');

const addLoanProposer = async (req, res) => {

    const { session_id, name, relation_type, relative_name, residence_type, door_number, street_name, city_name, mandal_name, district_name, pincode } = req.body;
   // Check if the mandatory fields are provided
   if ( !session_id || !name || !relation_type || !relative_name || !residence_type || !city_name || !mandal_name || !district_name || !pincode) {
    return res.status(400).send('name,relation_type, relative_name, residence_type, city_name, mandal_name, district_name and pincode are required');
}

try {
    // Check if name is provided, if not assign it as null or any default value
    const loanproposer = await loanProposerModel.createLoanProposer([
        session_id,
        name, // if 'name' is not provided, it will default to null
        relation_type,
        relative_name,
        residence_type,
        door_number || null,
        street_name || null,
        city_name,
        mandal_name,
        district_name,
        pincode
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
