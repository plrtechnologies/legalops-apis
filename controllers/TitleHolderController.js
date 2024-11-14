const TitleHolderModel = require('../models/TitleHolderModel');

//for title holder
const addTitleHolder = async (req, res) => {
    const { th_name, th_relation_type, th_relative_name, th_residence_type, th_door_number, th_street_name, th_city_name, th_mandal_name, th_district_name, th_pincode } = req.body;
        //where 'th' means title holder 
    try {
        const th_vales = await TitleHolderModel.createTitleHolder([ th_name, th_relation_type, th_relative_name, th_residence_type, th_door_number, th_street_name, th_city_name, th_mandal_name, th_district_name, th_pincode]);
        res.send({ th_vales, message: 'Title Holder  added successfully!' });
    } catch (err) {
        console.error('Error adding Title Holder  :', err.stack);
        res.status(500).send('Error adding Title Holderrrr');
    }
};

const retrieveTitleHolder = async (req, res) => {
    try {
        const TitleHolder = await TitleHolderModel.getTitleHolder();
        res.send(TitleHolder);
    } catch (err) {
        console.error('Error retrieving Title Holder Details:', err.stack);
        res.status(500).send('Error retrieving Title Holder Details');
    }
};

module.exports ={ addTitleHolder,retrieveTitleHolder};