const HouseTaxReceiptModel = require('../models/HouseTaxReceiptModel');

const addHouseTaxReceipt = async (req, res) => {
    const { session_id, DocType, ReceiptIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountPaid, AmountPaidInFavourOf } = req.body;

    // Check if all mandatory fields are provided
    if (!session_id || !DocType || !ReceiptIssuigAuthority || !DoorNumberOnReceipt || !AssessmentNumberOnReceipt || !AmountPaid || !AmountPaidInFavourOf) {
        return res.status(400).send({
            statusCode: 400,
            message: 'session_id, DocType, ReceiptIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountPaid, and AmountPaidInFavourOf are required.'
        });
    }

    try {
        // Add House Tax Receipt details to the database
        const HouseTaxReceipt = await HouseTaxReceiptModel.createHouseTaxReceipt([
            session_id, DocType, ReceiptIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountPaid, AmountPaidInFavourOf
        ]);

        // Success response
        res.status(200).send({
            statusCode: 200,
            message: 'House Tax Receipt added successfully!',
            data: HouseTaxReceipt
        });

    } catch (err) {
        console.error('Error adding House Tax Receipt Details:', err.stack);
        // Error response with status code 500
        res.status(500).send({
            statusCode: 500,
            message: 'Error adding House Tax Receipt Details',
            error: err.stack
        });
    }
};

const retrieveHouseTaxReceipt = async (req, res) => {
    try {
        const HouseTaxReceipts = await HouseTaxReceiptModel.getHouseTaxReceipt();

        // If no House Tax Receipts are found, return a 404 response
        if (HouseTaxReceipts.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No House Tax Receipts found.'
            });
        }

        // Success response with House Tax Receipt records
        res.status(200).send({
            statusCode: 200,
            message: 'House Tax Receipts retrieved successfully!',
            data: HouseTaxReceipts
        });

    } catch (err) {
        console.error('Error retrieving House Tax Receipts:', err.stack);
        // Error response with status code 500
        res.status(500).send({
            statusCode: 500,
            message: 'Error retrieving House Tax Receipts',
            error: err.stack
        });
    }
};

module.exports = {
    addHouseTaxReceipt,
    retrieveHouseTaxReceipt
};
