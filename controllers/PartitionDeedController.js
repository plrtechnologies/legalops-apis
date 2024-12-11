const PartitionDeedModel = require('../models/PartitionDeedModel');


const addPartitionDeed = async (req, res) => {
    const { session_id,DocType, PartitionerName, RecipientName, RegistrationDate, DocNumber, IssuigAuthority } = req.body;
  
   
    try {
        const PartitionDeed = await PartitionDeedModel.createPartitionDeed([ session_id, DocType, PartitionerName, RecipientName, RegistrationDate, DocNumber, IssuigAuthority]);
        res.send({ PartitionDeed, message: 'Partition Deed Details  added successfully!' });
    } catch (err) {
        console.error('Error adding Partition Deed Details  :', err.stack);
        res.status(500).send('Error adding Partition Deed Details');
    }
};

const retrievePartitionDeed = async (req, res) => {
    try {
        const PartitionDeeds = await PartitionDeedModel.getPartitionDeed();
        res.send(PartitionDeeds);
    } catch (err) {
        console.error('Error retrieving Partition Deed Details:', err.stack);
        res.status(500).send('Error retrieving Partition Deed Details');
    }
};

module.exports ={ addPartitionDeed,retrievePartitionDeed};