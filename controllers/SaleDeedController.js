const SaleDeedModel = require('../models/SaleDeedModel');

// Add Sale Deed Function
const addSaleDeed = async (req, res) => {
    const { session_id, DocType, SellerName, BuyerName, RegistrationDate, DocNumber, IssuigAuthority } = req.body;

    // Validate the input fields to ensure all required fields are provided
    if (!session_id || !DocType || !SellerName || !BuyerName || !RegistrationDate || !DocNumber || !IssuigAuthority) {
        return res.status(400).send({
            statusCode: 400,
            message: 'All fields are required: session_id, DocType, SellerName, BuyerName, RegistrationDate, DocNumber, IssuigAuthority'
        });
    }

    try {
        // Call the model method to create the Sale Deed
        const saleDeed = await SaleDeedModel.createSaleDeed([
            session_id,
            DocType,
            SellerName,
            BuyerName,
            RegistrationDate,
            DocNumber,
            IssuigAuthority
        ]);

        // Send a success response with status code 200
        res.status(200).send({
            statusCode: 200,
            message: 'Sale Deed Details added successfully!',
            data: saleDeed
        });
    } catch (err) {
        // Handle any errors that occur during the process
        console.error('Error adding Sale Deed Details:', err.stack);
        res.status(500).send({
            statusCode: 500,
            message: 'Error adding Sale Deed Details',
            error: err.stack
        });
    }
};

// Retrieve Sale Deed Function
const retrieveSaleDeed = async (req, res) => {
    try {
        // Retrieve all Sale Deeds from the database
        const saleDeeds = await SaleDeedModel.getSaleDeed();
        
        // If no records are found, return a 404 response
        if (saleDeeds.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No Sale Deed records found.'
            });
        }

        // Send a success response with the status code 200
        res.status(200).send({
            statusCode: 200,
            message: 'Sale Deed records retrieved successfully!',
            data: saleDeeds
        });
    } catch (err) {
        // Handle any errors that occur during retrieval
        console.error('Error retrieving Sale Deed Details:', err.stack);
        res.status(500).send({
            statusCode: 500,
            message: 'Error retrieving Sale Deed Details',
            error: err.stack
        });
    }
};

module.exports = {
    addSaleDeed,
    retrieveSaleDeed
};
