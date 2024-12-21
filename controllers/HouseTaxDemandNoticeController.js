const HouseTaxDemandNoticeModel = require('../models/HouseTaxDemandNoticeModel');


const addHouseTaxDemandNotice = async (req, res) => {
    const { session_id, DocType, NoticeIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountDue, AmountDueInFavourOf } = req.body;
  
   
    try {
        const HouseTaxDemandNotice = await HouseTaxDemandNoticeModel.createHouseTaxDemandNotice([ session_id, DocType, NoticeIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountDue, AmountDueInFavourOf]);
        res.send({ HouseTaxDemandNotice, message: 'House Tax Demand Notice  added successfully!' });
    } catch (err) {
        console.error('Error adding House Tax Demand Notice Details  :', err.stack);
        res.status(500).send('Error adding House Tax Demand Notice Details');
    }
};

const retrieveHouseTaxDemandNotice = async (req, res) => {
    try {
        const HouseTaxDemandNotices = await HouseTaxDemandNoticeModel.getHouseTaxDemandNotice();
        res.send(HouseTaxDemandNotices);
    } catch (err) {
        console.error('Error retrieving HouseTaxDemandNotice Details:', err.stack);
        res.status(500).send('Error retrieving HouseTaxDemandNotice Details');
    }
};

module.exports ={ addHouseTaxDemandNotice,retrieveHouseTaxDemandNotice};