const EcModel = require('../models/EcModel');


const addEc = async (req, res) => {
    const { session_id, DocType, EcIssuigAuthority, EcStatementNumber, FromDate, ToDate } = req.body;
  
   
    try {
        const Ec = await EcModel.createEc([ session_id, DocType, EcIssuigAuthority, EcStatementNumber, FromDate, ToDate]);
        res.send({ Ec, message: 'EC Details  added successfully!' });
    } catch (err) {
        console.error('Error adding EC Details  :', err.stack);
        res.status(500).send('Error adding Will Deed Details');
    }
};

const retrieveEc = async (req, res) => {
    try {
        const Ecs = await EcModel.getEc();
        res.send(Ecs);
    } catch (err) {
        console.error('Error retrieving EC Details:', err.stack);
        res.status(500).send('Error retrieving EC Details');
    }
};

module.exports ={ addEc,retrieveEc};