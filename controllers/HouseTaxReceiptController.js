const HouseTaxReceiptModel = require('../models/HouseTaxReceiptModel');


const addHouseTaxReceipt = async (req, res) => {
    const { session_id, DocType, ReceiptIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountPaid, AmountPaidInFavourOf } = req.body;
  
   
    try {
        const HouseTaxReceipt = await HouseTaxReceiptModel.createHouseTaxReceipt([ session_id, DocType, ReceiptIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountPaid, AmountPaidInFavourOf]);
        res.send({ HouseTaxReceipt, message: 'House Tax Receipt  added successfully!' });
    } catch (err) {
        console.error('Error adding House Tax Receipt Details  :', err.stack);
        res.status(500).send('Error adding HouseTaxReceipt Details');
    }
};

const retrieveHouseTaxReceipt = async (req, res) => {
    try {
        const HouseTaxReceipts = await HouseTaxReceiptModel.getHouseTaxReceipt();
        res.send(HouseTaxReceipts);
    } catch (err) {
        console.error('Error retrieving HouseTaxReceipt Details:', err.stack);
        res.status(500).send('Error retrieving HouseTaxReceipt Details');
    }
};

module.exports ={ addHouseTaxReceipt,retrieveHouseTaxReceipt};