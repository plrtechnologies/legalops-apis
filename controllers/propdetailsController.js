const propDetailsModel = require('../models/propdetailsModel');

const addPropDetail = async (req, res) => {
  
    const {"session_id": session_id,
        "propertyDoorNumber": doorno,
       "nearbyDoor": nearbyDoor,  // Checkbox for nearby door
        "propertyAssessmentNumber": assessmentno,
        "propertySurveyNumber": surveyno,
        "ExtentOfProperty": extentOfProp,
        "propertyType": propType,
        "propertyNature": propNature,
    } = req.body;

    // Convert checkbox value to a boolean for nearbyDoor
    const isNearbyDoor = nearbyDoor === "yes";  // If checked, isNearbyDoor will be true

        // Define the valid values for propType and propNature (based on dropdown options)
        const validPropTypes = ["RCC Dhaba House", "Site", "Tiled House"];
        const validPropNatures = ["Commercial", "Residential"];
    
        // Check if the provided propType and propNature are valid
        if (!validPropTypes.includes(propType)) {
            return res.status(400).send({
                statusCode: 400,
                message: `Invalid property type. Valid options are: ${validPropTypes.join(", ")}`
            });
        }
        
        if (!validPropNatures.includes(propNature)) {
            return res.status(400).send({
                statusCode: 400,
                message: `Invalid property nature. Valid options are: ${validPropNatures.join(", ")}`
            });
        }
    

    try {
        // Check if name is provided, if not assign it as null or any default value
        const propdetail = await propDetailsModel.createPropDetail([
            session_id,
            doorno,
            nearbyDoor,  // Store the 'nearby door' status (true/false)
            assessmentno,
            surveyno,
            extentOfProp,
            propType,
            propNature,
        ]);
    
      // Success response
      res.status(200).send({
        statusCode: 200,
        message: 'Property Details added successfully!',
        data: propdetail
    });

} catch (err) {
    console.error('Error adding property details:', err.stack);
    // Error response with status code 500
    res.status(500).send({
        statusCode: 500,
        message: 'Error adding property details',
        error: err.stack
    });
}
};

const retrievePropDetails = async (req, res) => {
    try {
        const propdetails = await propDetailsModel.getPropDetails();

        // If no property details found, return a 404 Not Found response
        if (propdetails.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: 'No property details found.'
            });
        }

        // Success response with property details
        res.status(200).send({
            statusCode: 200,
            message: 'Property details retrieved successfully!',
            data: propdetails
        });

    } catch (err) {
        console.error('Error retrieving property details:', err.stack);
        // Error response with status code 500
        res.status(500).send({
            statusCode: 500,
            message: 'Error retrieving property details',
            error: err.stack
        });
    }
};

module.exports = {
    addPropDetail,
    retrievePropDetails,
};
