
const { createOrUpdateLinkDocument, getLinkDocumentBySessionId } = require('../models/linkdocModel');


const addlinkDocument = async (req, res) => {
    try {
        const data = req.body;

        if (!data.selectDeedType) {
            return res.status(400).json({ error: 'Missing selectDeedType in request' });
        }

        const result = await createOrUpdateLinkDocument(data);  // Call function directly
        return res.status(200).json(result);

    } catch (err) {
        console.error('Error in addlinkDocument:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getlinkDocument = async (req, res) => {
    try {
        const { session_id } = req.params;
        const result = await getLinkDocumentBySessionId(session_id);  // Call function directly


        if (!result) {
            return res.status(404).json({ message: 'link_document not found' });
        }

        return res.status(200).json(result);
    } catch (err) {
        console.error('Error in getlinkDocument:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addlinkDocument,
    getlinkDocument
};
