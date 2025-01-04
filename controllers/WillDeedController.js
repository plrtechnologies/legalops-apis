const WillDeedModel = require('../models/WillDeedModel');

// Add Will Deed Function
const addWillDeed = async (req, res) => {
    const { session_id, DocType, TestatorName, BeneficiaryName, RegistrationDate, DocNumber, IssuigAuthority } = req.body;

    // Validate the input fields to ensure all required fields are provided
    if (!session_id || !DocType || !TestatorName || !BeneficiaryName || !RegistrationDate || !DocNumber || !IssuigAuthority) {
        return res.status(400).send({
            statusCode: 400,
            message: 'All fields are required: session_id, DocType, TestatorName, BeneficiaryName, RegistrationDate, DocNumber, IssuigAuthority'
        });
    }

    try {
        // Create the Will Deed entry in the database
        const willDeed = await WillDeedModel.createWillDeed([
            session_id, 
            DocType, 
            TestatorName, 
            BeneficiaryName, 
            RegistrationDate, 
            DocNumber, 
            IssuigAuthority
        ]);

        // Send success response
        res.status(200).send({
            statusCode: 200,
            message: 'Will Deed Details added successfully!',
            data: willDeed
        });
    } catch (err) {
        // Handle any errors
        console.error('Error adding Will Deed Details:', err.stack);
        res.status(500).send({
            statusCode: 500,
            message: 'Error adding Will Deed Details',
            error: err.stack
        });
    }
};

// Retrieve Will Deed Function
const retrieveWillDeed = async (req, res) => {
    try {
        // Retrieve all Will Deeds from the database
        const willDeeds = await WillDeedModel.getWillDeed();
        
        // If no Will Deeds are found
        if (willDeeds.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No Will Deed records found.'
            });
        }

        // Send success response
        res.status(200).send({
            statusCode: 200,
            message: 'Will Deed records retrieved successfully!',
            data: willDeeds
        });
    } catch (err) {
        // Handle any errors
        console.error('Error retrieving Will Deed Details:', err.stack);
        res.status(500).send({
            statusCode: 500,
            message: 'Error retrieving Will Deed Details',
            error: err.stack
        });
    }
};

module.exports = {
    addWillDeed,
    retrieveWillDeed
};
