const WillDeedModel = require('../models/WillDeedModel');


const addWillDeed = async (req, res) => {
    const { session_id,DocType, TestatorName, BeneficiaryName, RegistrationDate, DocNumber, IssuigAuthority } = req.body;
  
   
    try {
        const WillDeed = await WillDeedModel.createWillDeed([ session_id, DocType, TestatorName, BeneficiaryName, RegistrationDate, DocNumber, IssuigAuthority]);
        res.send({ WillDeed, message: 'Will Deed Details  added successfully!' });
    } catch (err) {
        console.error('Error adding Will Deed Details  :', err.stack);
        res.status(500).send('Error adding Will Deed Details');
    }
};

const retrieveWillDeed = async (req, res) => {
    try {
        const WillDeeds = await WillDeedModel.getWillDeed();
        res.send(WillDeeds);
    } catch (err) {
        console.error('Error retrieving Will Deed Details:', err.stack);
        res.status(500).send('Error retrieving Will Deed Details');
    }
};

module.exports ={ addWillDeed,retrieveWillDeed};