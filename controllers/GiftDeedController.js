const GiftDeedModel = require('../models/GiftDeedModel');


const addGiftDeed = async (req, res) => {
    const { session_id,DocType, DonorName, DoneeName, RegistrationDate, DocNumber, IssuigAuthority } = req.body;
  
   
    try {
        const GiftDeed = await GiftDeedModel.createGiftDeed([ session_id, DocType, DonorName, DoneeName, RegistrationDate, DocNumber, IssuigAuthority]);
        res.send({ GiftDeed, message: 'Gift Deed Details  added successfully!' });
    } catch (err) {
        console.error('Error adding Gift Deed Details  :', err.stack);
        res.status(500).send('Error adding Gift Deed Details');
    }
};

const retrieveGiftDeed = async (req, res) => {
    try {
        const GiftDeeds = await GiftDeedModel.getGiftDeed();
        res.send(GiftDeeds);
    } catch (err) {
        console.error('Error retrieving Gift Deed Details:', err.stack);
        res.status(500).send('Error retrieving Gift Deed Details');
    }
};

module.exports ={ addGiftDeed,retrieveGiftDeed};