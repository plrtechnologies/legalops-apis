const MortgageDeedModel = require('../models/MortgageDeedModel');

const addMortgageDeed = async (req, res) => {
    const { session_id, DocType, MortgagorName, MortgageeName, RegistrationDate, DocNumber, IssuigAuthority } = req.body;

    // Check if all mandatory fields are provided
    if (!session_id || !DocType || !MortgagorName || !MortgageeName || !RegistrationDate || !DocNumber || !IssuigAuthority) {
        return res.status(400).send({
            statusCode: 400,
            message: 'session_id, DocType, MortgagorName, MortgageeName, RegistrationDate, DocNumber, and IssuigAuthority are required.'
        });
    }

    try {
        // Add Mortgage Deed details to the database
        const MortgageDeed = await MortgageDeedModel.createMortgageDeed([
            session_id, DocType, MortgagorName, MortgageeName, RegistrationDate, DocNumber, IssuigAuthority
        ]);

        // Success response
        res.status(200).send({
            statusCode: 200,
            message: 'Mortgage Deed Details added successfully!',
            data: MortgageDeed
        });

    } catch (err) {
        console.error('Error adding Mortgage Deed Details:', err.stack);
        // Error response with status code 500
        res.status(500).send({
            statusCode: 500,
            message: 'Error adding Mortgage Deed Details',
            error: err.stack
        });
    }
};

const retrieveMortgageDeed = async (req, res) => {
    try {
        const MortgageDeeds = await MortgageDeedModel.getMortgageDeed();

        // If no Mortgage Deeds are found, return a 404 response
        if (MortgageDeeds.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No Mortgage Deeds found.'
            });
        }

        // Success response with Mortgage Deed records
        res.status(200).send({
            statusCode: 200,
            message: 'Mortgage Deeds retrieved successfully!',
            data: MortgageDeeds
        });

    } catch (err) {
        console.error('Error retrieving Mortgage Deeds:', err.stack);
        // Error response with status code 500
        res.status(500).send({
            statusCode: 500,
            message: 'Error retrieving Mortgage Deeds',
            error: err.stack
        });
    }
};

module.exports = {
    addMortgageDeed,
    retrieveMortgageDeed
};
