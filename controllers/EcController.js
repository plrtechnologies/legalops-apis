const EcModel = require('../models/EcModel');

const addEc = async (req, res) => {
    const { session_id, DocType, EcIssuigAuthority, EcStatementNumber, FromDate, ToDate } = req.body;

    // Check if all the mandatory fields are provided
    if (!session_id || !DocType || !EcIssuigAuthority || !EcStatementNumber || !FromDate || !ToDate) {
        return res.status(400).send({
            statusCode: 400,
            message: 'session_id, DocType, EcIssuigAuthority, EcStatementNumber, FromDate, and ToDate are required.'
        });
    }

    try {
        // Add EC details to the database
        const Ec = await EcModel.createEc([session_id, DocType, EcIssuigAuthority, EcStatementNumber, FromDate, ToDate]);

        // Success response
        res.status(200).send({
            statusCode: 200,
            message: 'EC Details added successfully!',
            data: Ec
        });

    } catch (err) {
        console.error('Error adding EC Details:', err.stack);
        // Error response with status code 500
        res.status(500).send({
            statusCode: 500,
            message: 'Error adding EC Details',
            error: err.stack
        });
    }
};

const retrieveEc = async (req, res) => {
    try {
        const Ecs = await EcModel.getEc();

        // If no EC records are found, return a 404 response
        if (Ecs.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No EC Details found.'
            });
        }

        // Success response with EC records
        res.status(200).send({
            statusCode: 200,
            message: 'EC Details retrieved successfully!',
            data: Ecs
        });

    } catch (err) {
        console.error('Error retrieving EC Details:', err.stack);
        // Error response with status code 500
        res.status(500).send({
            statusCode: 500,
            message: 'Error retrieving EC Details',
            error: err.stack
        });
    }
};

module.exports = { 
    addEc,
    retrieveEc 
};
