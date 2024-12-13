const propDetailsModel = require('../models/propdetailsModel');

const addPropDetail = async (req, res) => {
  
    const {"session_id": session_id,
        "propertyDoorNumber": doorno,
        nearbyDoor,// Checkbox for nearby door
        "propertyAssessmentNumber": assessmentno,
        "propertySurveyNumber": surveyno,
        "ExtentOfProoperty": extentOfProp,
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
            return res.status(400).send(`Invalid property type. Valid options are: ${validPropTypes.join(", ")}`);
        }
        
        if (!validPropNatures.includes(propNature)) {
            return res.status(400).send(`Invalid property nature. Valid options are: ${validPropNatures.join(", ")}`);
        }
    

    try {
        // Check if name is provided, if not assign it as null or any default value
        const propdetail = await propDetailsModel.createPropDetail([
            session_id,
            doorno,
            isNearbyDoor,  // Store the 'nearby door' status (true/false)
            assessmentno,
            surveyno,
            extentOfProp,
            propType,
            propNature,
        ]);
    
    res.send({ propdetail, message: 'Property Details added successfully!' });
} catch (err) {
    console.error('Error adding property details:', err.stack);
    res.status(500).send('Error adding property details');
}
};

const retrievePropDetails = async (req, res) => {
    try {
        const propdetails = await propDetailsModel.getPropDetails();
        res.send(propdetails);
    } catch (err) {
        console.error('Error retrieving property details:', err.stack);
        res.status(500).send('Error retrieving property details');
    }
};

module.exports = {
    addPropDetail,
    retrievePropDetails,
};
