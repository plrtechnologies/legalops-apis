const RelinquishDeedModel = require('../models/RelinquishDeedModel');

const addRelinquishDeed = async (req, res) => {
    const { session_id, DocType, RelinquisherName, RecipientName, RegistrationDate, DocNumber, IssuigAuthority } = req.body;

    // Validate the input fields to ensure all required fields are provided
    if (!session_id || !DocType || !RelinquisherName || !RecipientName || !RegistrationDate || !DocNumber || !IssuigAuthority) {
        return res.status(400).send({
            statusCode: 400,
            message: 'All fields are required: session_id, DocType, RelinquisherName, RecipientName, RegistrationDate, DocNumber, IssuigAuthority'
        });
    }

    try {
        // Call the model method to create the Relinquish Deed
        const relinquishDeed = await RelinquishDeedModel.createRelinquishDeed([
            session_id,
            DocType,
            RelinquisherName,
            RecipientName,
            RegistrationDate,
            DocNumber,
            IssuigAuthority
        ]);

        // Send a success response with status code 200
        res.status(200).send({
            statusCode: 200,
            message: 'Relinquish Deed Details added successfully!',
            data: relinquishDeed
        });
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error adding Relinquish Deed Details:', err.stack);
        res.status(500).send({
            statusCode: 500,
            message: 'Error adding Relinquish Deed Details',
            error: err.stack
        });
    }
};

const retrieveRelinquishDeed = async (req, res) => {
    try {
        // Retrieve all Relinquish Deeds from the database
        const relinquishDeeds = await RelinquishDeedModel.getRelinquishDeed();
        
        // If no records are found, return a 404 response
        if (relinquishDeeds.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No Relinquish Deed records found.'
            });
        }

        // Send a success response with the status code 200
        res.status(200).send({
            statusCode: 200,
            message: 'Relinquish Deed records retrieved successfully!',
            data: relinquishDeeds
        });
    } catch (err) {
        // Handle any errors that occur during retrieval
        console.error('Error retrieving Relinquish Deed Details:', err.stack);
        res.status(500).send({
            statusCode: 500,
            message: 'Error retrieving Relinquish Deed Details',
            error: err.stack
        });
    }
};

module.exports = {
    addRelinquishDeed,
    retrieveRelinquishDeed
};
