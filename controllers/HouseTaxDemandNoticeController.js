const HouseTaxDemandNoticeModel = require('../models/HouseTaxDemandNoticeModel');

const addHouseTaxDemandNotice = async (req, res) => {
    const { session_id, DocType, NoticeIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountDue, AmountDueInFavourOf } = req.body;

    // Check if all mandatory fields are provided
    if (!session_id || !DocType || !NoticeIssuigAuthority || !DoorNumberOnReceipt || !AssessmentNumberOnReceipt || !AmountDue || !AmountDueInFavourOf) {
        return res.status(400).send({
            statusCode: 400,
            message: 'session_id, DocType, NoticeIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountDue, and AmountDueInFavourOf are required.'
        });
    }

    try {
        // Add House Tax Demand Notice details to the database
        const HouseTaxDemandNotice = await HouseTaxDemandNoticeModel.createHouseTaxDemandNotice([
            session_id, DocType, NoticeIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountDue, AmountDueInFavourOf
        ]);

        // Success response
        res.status(200).send({
            statusCode: 200,
            message: 'House Tax Demand Notice added successfully!',
            data: HouseTaxDemandNotice
        });

    } catch (err) {
        console.error('Error adding House Tax Demand Notice Details:', err.stack);
        // Error response with status code 500
        res.status(500).send({
            statusCode: 500,
            message: 'Error adding House Tax Demand Notice Details',
            error: err.stack
        });
    }
};

const retrieveHouseTaxDemandNotice = async (req, res) => {
    try {
        const HouseTaxDemandNotices = await HouseTaxDemandNoticeModel.getHouseTaxDemandNotice();

        // If no House Tax Demand Notices are found, return a 404 response
        if (HouseTaxDemandNotices.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No House Tax Demand Notices found.'
            });
        }

        // Success response with House Tax Demand Notice records
        res.status(200).send({
            statusCode: 200,
            message: 'House Tax Demand Notices retrieved successfully!',
            data: HouseTaxDemandNotices
        });

    } catch (err) {
        console.error('Error retrieving House Tax Demand Notices:', err.stack);
        // Error response with status code 500
        res.status(500).send({
            statusCode: 500,
            message: 'Error retrieving House Tax Demand Notices',
            error: err.stack
        });
    }
};

module.exports = { 
    addHouseTaxDemandNotice, 
    retrieveHouseTaxDemandNotice 
};
