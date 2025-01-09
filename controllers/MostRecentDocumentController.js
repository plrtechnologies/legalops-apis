const MostRecentDocumentModel = require('../models/MostRecentDocumentModel');

const addMostRecentDocument = async (req, res) => {
    const { 
        session_id,
        selectDeedType, 
        dateofRegistration, 
        documentNumber, 
        nameofSubregistrarOffice, 
        locationOfSubregistrarOffice, 
        subregistrarOfficeMandal, 
        subregistrarOfficeDistrict, 
        subregistrarOfficeLocalAuthority 
    } = req.body;

    // Validate mandatory fields
    if (!session_id || !selectDeedType || !dateofRegistration || !documentNumber || !nameofSubregistrarOffice || !locationOfSubregistrarOffice || !subregistrarOfficeMandal || !subregistrarOfficeDistrict || !subregistrarOfficeLocalAuthority) {
        return res.status(400).send({
            statusCode: 400,
            message: 'session_id, selectDeedType, dateofRegistration, documentNumber, nameofSubregistrarOffice, locationOfSubregistrarOffice, subregistrarOfficeMandal, subregistrarOfficeDistrict, and subregistrarOfficeLocalAuthority are required.'
        });
    }

    // Validate selectDeedType (should be one of the predefined types)
    const validselectDeedTypes = ["SaleDeed", "GiftDeed", "WillDeed", "RelinquishmentDeed", "MortgageDeed", "PartitionDeed"];
    if (!validselectDeedTypes.includes(selectDeedType)) {
        return res.status(400).send({
            statusCode: 400,
            message: `Invalid selectDeedType. Valid options are: ${validselectDeedTypes.join(", ")}`
        });
    }

    try {
        // Create MostRecentDocument entry in the database
        const MRDocument = await MostRecentDocumentModel.createMostRecentDoc([
            session_id,
            selectDeedType,
            dateofRegistration,
            documentNumber,
            nameofSubregistrarOffice,
            locationOfSubregistrarOffice,
            subregistrarOfficeMandal,
            subregistrarOfficeDistrict,
            subregistrarOfficeLocalAuthority
        ]);

        res.status(200).send({
            statusCode: 200,
            message: 'MostRecentDocument added successfully!',
            data: MRDocument
        });

    } catch (err) {
        console.error('Error adding MostRecentDocument:', err.stack);
        res.status(500).send({
            statusCode: 500,
            message: 'Error adding MostRecentDocument',
            error: err.stack
        });
    }
};

const retrieveMostRecentDocuments = async (req, res) => {
    try {
        const M_S_Document = await MostRecentDocumentModel.getMostRecentDocs();
        
        // If no documents found, return a 404 response
        if (M_S_Document.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No MostRecentDocuments found.'
            });
        }

        res.status(200).send({
            statusCode: 200,
            message: 'MostRecentDocuments retrieved successfully!',
            data: M_S_Document
        });
    } catch (err) {
        console.error('Error retrieving MostRecentDocument:', err.stack);
        res.status(500).send({
            statusCode: 500,
            message: 'Error retrieving MostRecentDocument',
            error: err.stack
        });
    }
};

module.exports = {
    addMostRecentDocument,
    retrieveMostRecentDocuments,
};
