const PartitionDeedModel = require('../models/PartitionDeedModel');

const addPartitionDeed = async (req, res) => {
    const { session_id, DocType, PartitionerName, RecipientName, RegistrationDate, DocNumber, IssuigAuthority } = req.body;

    // Check if all mandatory fields are provided
    if (!session_id || !DocType || !PartitionerName || !RecipientName || !RegistrationDate || !DocNumber || !IssuigAuthority) {
        return res.status(400).send({
            statusCode: 400,
            message: 'session_id, DocType, PartitionerName, RecipientName, RegistrationDate, DocNumber, and IssuigAuthority are required.'
        });
    }

    try {
        // Add Partition Deed details to the database
        const PartitionDeed = await PartitionDeedModel.createPartitionDeed([
            session_id, DocType, PartitionerName, RecipientName, RegistrationDate, DocNumber, IssuigAuthority
        ]);

        // Success response
        res.status(200).send({
            statusCode: 200,
            message: 'Partition Deed Details added successfully!',
            data: PartitionDeed
        });

    } catch (err) {
        console.error('Error adding Partition Deed Details:', err.stack);
        // Error response with status code 500
        res.status(500).send({
            statusCode: 500,
            message: 'Error adding Partition Deed Details',
            error: err.stack
        });
    }
};

const retrievePartitionDeed = async (req, res) => {
    try {
        const PartitionDeeds = await PartitionDeedModel.getPartitionDeed();

        // If no Partition Deeds are found, return a 404 response
        if (PartitionDeeds.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No Partition Deeds found.'
            });
        }

        // Success response with Partition Deed records
        res.status(200).send({
            statusCode: 200,
            message: 'Partition Deeds retrieved successfully!',
            data: PartitionDeeds
        });

    } catch (err) {
        console.error('Error retrieving Partition Deeds:', err.stack);
        // Error response with status code 500
        res.status(500).send({
            statusCode: 500,
            message: 'Error retrieving Partition Deeds',
            error: err.stack
        });
    }
};

module.exports = {
    addPartitionDeed,
    retrievePartitionDeed
};
