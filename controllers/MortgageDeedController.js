const MortgageDeedModel = require('../models/MortgageDeedModel');


const addMortgageDeed = async (req, res) => {
    const { session_id,DocType, MortgagorName, MortgageeName, RegistrationDate, DocNumber, IssuigAuthority } = req.body;
  
   
    try {
        const MortgageDeed = await MortgageDeedModel.createMortgageDeed([ session_id, DocType, MortgagorName, MortgageeName, RegistrationDate, DocNumber, IssuigAuthority]);
        res.send({ MortgageDeed, message: 'Mortgage Deed Details  added successfully!' });
    } catch (err) {
        console.error('Error adding Mortgage Deed Details  :', err.stack);
        res.status(500).send('Error adding Mortgage Deed Details');
    }
};

const retrieveMortgageDeed = async (req, res) => {
    try {
        const MortgageDeeds = await MortgageDeedModel.getMortgageDeed();
        res.send(MortgageDeeds);
    } catch (err) {
        console.error('Error retrieving Mortgage Deed Details:', err.stack);
        res.status(500).send('Error retrieving Mortgage Deed Details');
    }
};

module.exports ={ addMortgageDeed,retrieveMortgageDeed};