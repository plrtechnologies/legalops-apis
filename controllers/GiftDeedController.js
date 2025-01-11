const GiftDeedModel = require('../models/GiftDeedModel');

const addGiftDeed = async (req, res) => {
    const { session_id, DocType, DonorName, DoneeName, RegistrationDate, DocNumber, IssuigAuthority } = req.body;

    // Check if all mandatory fields are provided
    if (!session_id || !DocType || !DonorName || !DoneeName || !RegistrationDate || !DocNumber || !IssuigAuthority) {
        return res.status(400).send({
            statusCode: 400,
            message: 'session_id, DocType, DonorName, DoneeName, RegistrationDate, DocNumber, and IssuigAuthority are required.'
        });
    }

    try {
        // Add Gift Deed details to the database
        const GiftDeed = await GiftDeedModel.createGiftDeed([session_id, DocType, DonorName, DoneeName, RegistrationDate, DocNumber, IssuigAuthority]);

        // Success response
        res.status(200).send({
            statusCode: 200,
            message: 'Gift Deed Details added successfully!',
            data: GiftDeed
        });

    } catch (err) {
        console.error('Error adding Gift Deed Details:', err.stack);
        // Error response with status code 500
        res.status(500).send({
            statusCode: 500,
            message: 'Error adding Gift Deed Details',
            error: err.stack
        });
    }
};

const retrieveGiftDeed = async (req, res) => {
    try {
        const GiftDeeds = await GiftDeedModel.getGiftDeed();

        // If no Gift Deed records are found, return a 404 response
        if (GiftDeeds.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No Gift Deed Details found.'
            });
        }

        // Success response with Gift Deed records
        res.status(200).send({
            statusCode: 200,
            message: 'Gift Deed Details retrieved successfully!',
            data: GiftDeeds
        });

    } catch (err) {
        console.error('Error retrieving Gift Deed Details:', err.stack);
        // Error response with status code 500
        res.status(500).send({
            statusCode: 500,
            message: 'Error retrieving Gift Deed Details',
            error: err.stack
        });
    }
};

module.exports = { 
    addGiftDeed,
    retrieveGiftDeed 
};
