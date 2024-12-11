const SaleDeedModel = require('../models/SaleDeedModel');


const addSaleDeed = async (req, res) => {
    const { session_id,DocType, SellerName, BuyerName, RegistrationDate, DocNumber, IssuigAuthority } = req.body;
  
   
    try {
        const SaleDeed = await SaleDeedModel.createSaleDeed([ session_id, DocType, SellerName, BuyerName, RegistrationDate, DocNumber, IssuigAuthority]);
        res.send({ SaleDeed, message: 'Sale Deed Details  added successfully!' });
    } catch (err) {
        console.error('Error adding Sale Deed Details  :', err.stack);
        res.status(500).send('Error adding Sale Deed Details');
    }
};

const retrieveSaleDeed = async (req, res) => {
    try {
        const SaleDeeds = await SaleDeedModel.getSaleDeed();
        res.send(SaleDeeds);
    } catch (err) {
        console.error('Error retrieving Sale Deed Details:', err.stack);
        res.status(500).send('Error retrieving Sale Deed Details');
    }
};

module.exports ={ addSaleDeed,retrieveSaleDeed};