const PropertyBoundaryModel = require('../models/PropertyBoundaryModel');

const addPropertyBoundary = async (req, res) => {
    const {
        session_id,
        eastBoundrytype,
        eastBoundryExtent,
        eastBoundryOwner,
        westBoundrytype,
        westBoundryExtent,
        westBoundryOwner,
        northBoundrytype,
        northBoundryExtent,
        northBoundryOwner,
        southBoundrytype,
        southBoundryExtent,
        southBoundryOwner
    } = req.body;

    // Validate if all required fields are provided
    if (!session_id || !eastBoundrytype || !eastBoundryExtent || !eastBoundryOwner || !westBoundrytype || 
        !westBoundryExtent || !westBoundryOwner || !northBoundrytype || !northBoundryExtent || 
        !northBoundryOwner || !southBoundrytype || !southBoundryExtent || !southBoundryOwner) {
        
        return res.status(400).send({
            statusCode: 400,
            message: 'All fields are required: session_id, eastBoundrytype, eastBoundryExtent, eastBoundryOwner, ' +
                     'westBoundrytype, westBoundryExtent, westBoundryOwner, northBoundrytype, northBoundryExtent, ' +
                     'northBoundryOwner, southBoundrytype, southBoundryExtent, and southBoundryOwner.'
        });
    }

    try {
        // Add property boundary details
        const propBoundary = await PropertyBoundaryModel.createPropertyboundary([
            session_id,
            eastBoundrytype,
            eastBoundryExtent,
            eastBoundryOwner,
            westBoundrytype,
            westBoundryExtent,
            westBoundryOwner,
            northBoundrytype,
            northBoundryExtent,
            northBoundryOwner,
            southBoundrytype,
            southBoundryExtent,
            southBoundryOwner
        ]);

        // Success response
        res.status(200).send({
            statusCode: 200,
            message: 'Property Boundary added successfully!',
            data: propBoundary
        });

    } catch (err) {
        console.error('Error adding Property Boundary:', err.stack);
        // Error response
        res.status(500).send({
            statusCode: 500,
            message: 'Error adding Property Boundary',
            error: err.stack
        });
    }
};

const retrievePropertyBoundaries = async (req, res) => {
    try {
        // Get all property boundaries
        const prop_Boundary = await PropertyBoundaryModel.getPropertyboundaries();

        // If no boundaries found, return 404 response
        if (prop_Boundary.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No Property Boundaries found.'
            });
        }

        // Success response
        res.status(200).send({
            statusCode: 200,
            message: 'Property Boundaries retrieved successfully!',
            data: prop_Boundary
        });

    } catch (err) {
        console.error('Error retrieving Property Boundaries:', err.stack);
        // Error response
        res.status(500).send({
            statusCode: 500,
            message: 'Error retrieving Property Boundaries',
            error: err.stack
        });
    }
};

module.exports = {
    addPropertyBoundary,
    retrievePropertyBoundaries
};
