const TitleHolderModel = require('../models/TitleHolderModel');

// Add Title Holder Function
const addTitleHolder = async (req, res) => {
    const { 
        session_id, 
        TitleHolderName, 
        TitleHolderRelationType, 
        TitleHolderRelativeName, 
        TitleHolderResidenceType, 
        TitleHolderDoorNumber, 
        TitleHolderStreetName, 
        TitleHolderCityName, 
        TitleHolderMandalName, 
        TitleHolderDistrictName, 
        TitleHolderPincode 
    } = req.body;

    // Validate the input fields to ensure all required fields are provided
    if (!session_id || !TitleHolderName || !TitleHolderRelationType || !TitleHolderRelativeName || !TitleHolderResidenceType || 
        !TitleHolderDoorNumber || !TitleHolderStreetName || !TitleHolderCityName || !TitleHolderMandalName || !TitleHolderDistrictName || !TitleHolderPincode) {
        return res.status(400).send({
            statusCode: 400,
            message: 'All fields are required: session_id, TitleHolderName, TitleHolderRelationType, TitleHolderRelativeName, TitleHolderResidenceType, TitleHolderDoorNumber, TitleHolderStreetName, TitleHolderCityName, TitleHolderMandalName, TitleHolderDistrictName, TitleHolderPincode'
        });
    }

    try {
        // Create the Title Holder entry in the database
        const titleHolder = await TitleHolderModel.createTitleHolder([
            session_id,
            TitleHolderName,
            TitleHolderRelationType,
            TitleHolderRelativeName,
            TitleHolderResidenceType,
            TitleHolderDoorNumber,
            TitleHolderStreetName,
            TitleHolderCityName,
            TitleHolderMandalName,
            TitleHolderDistrictName,
            TitleHolderPincode
        ]);

        // Send success response
        res.status(200).send({
            statusCode: 200,
            message: 'Title Holder added successfully!',
            data: titleHolder
        });
    } catch (err) {
        // Handle any errors
        console.error('Error adding Title Holder:', err.stack);
        res.status(500).send({
            statusCode: 500,
            message: 'Error adding Title Holder',
            error: err.stack
        });
    }
};

// Retrieve Title Holders Function
const retrieveTitleHolder = async (req, res) => {
    try {
        // Retrieve all title holders from the database
        const titleHolders = await TitleHolderModel.getTitleHolder();
        
        // If no title holders are found
        if (titleHolders.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No Title Holder records found.'
            });
        }

        // Send success response
        res.status(200).send({
            statusCode: 200,
            message: 'Title Holder records retrieved successfully!',
            data: titleHolders
        });
    } catch (err) {
        // Handle any errors
        console.error('Error retrieving Title Holder Details:', err.stack);
        res.status(500).send({
            statusCode: 500,
            message: 'Error retrieving Title Holder Details',
            error: err.stack
        });
    }
};

module.exports = {
    addTitleHolder,
    retrieveTitleHolder
};
