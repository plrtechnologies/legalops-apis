const TitleHolderModel = require('../models/TitleHolderModel');

//for title holder
const addTitleHolder = async (req, res) => {
    const { session_id, TitleHolderName, TitleHolderRelationType, TitleHolderRelativeName, TitleHolderResidenceType, TitleHolderDoorNumber, TitleHolderStreetName, TitleHolderCityName, TitleHolderMandalName, TitleHolderDistrictName, TitleHolderPincode } = req.body;
  
   
    try {
        const TitleHolder = await TitleHolderModel.createTitleHolder([ session_id, TitleHolderName, TitleHolderRelationType, TitleHolderRelativeName, TitleHolderResidenceType, TitleHolderDoorNumber, TitleHolderStreetName, TitleHolderCityName, TitleHolderMandalName, TitleHolderDistrictName, TitleHolderPincode]);
        res.send({ TitleHolder, message: 'Title Holder  added successfully!' });
    } catch (err) {
        console.error('Error adding Title Holder  :', err.stack);
        res.status(500).send('Error adding Title Holderrrr');
    }
};

const retrieveTitleHolder = async (req, res) => {
    try {
        const TitleHolders = await TitleHolderModel.getTitleHolder();
        res.send(TitleHolders);
    } catch (err) {
        console.error('Error retrieving Title Holder Details:', err.stack);
        res.status(500).send('Error retrieving Title Holder Details');
    }
};

module.exports ={ addTitleHolder,retrieveTitleHolder};