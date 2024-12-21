const RelinquishDeedModel = require('../models/RelinquishDeedModel');


const addRelinquishDeed = async (req, res) => {
    const { session_id,DocType, RelinquisherName, RecipientName, RegistrationDate, DocNumber, IssuigAuthority } = req.body;
  
   
    try {
        const RelinquishDeed = await RelinquishDeedModel.createRelinquisDeed([ session_id, DocType, RelinquisherName, RecipientName, RegistrationDate, DocNumber, IssuigAuthority]);
        res.send({ RelinquishDeed, message: 'Relinquish Deed Details  added successfully!' });
    } catch (err) {
        console.error('Error adding Relinquish Deed Details  :', err.stack);
        res.status(500).send('Error adding Relinquish Deed Details');
    }
};

const retrieveRelinquishDeed = async (req, res) => {
    try {
        const RelinquishDeeds = await RelinquishDeedModel.getRelinquisDeed();
        res.send(RelinquishDeeds);
    } catch (err) {
        console.error('Error retrieving Relinquish Deed Details:', err.stack);
        res.status(500).send('Error retrieving Relinquish Deed Details');
    }
};

module.exports ={ addRelinquishDeed,retrieveRelinquishDeed};