const { createOrUpdateSession, getSessionById } = require('../models/sessionModel');



const addSession = async (req, res) => {
    try {
        const data = req.body;

        // Call the model function
        const result = await createOrUpdateSession(data);

        // If a message was returned instead of full DB result, return it
        if (result?.message) {
            return res.status(200).json(result);
        }

        // Otherwise, return the same data that was received in the request
        return res.status(200).json(data);
    } catch (err) {
        console.error('Error in addSession:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSession = async (req, res) => {
    try {
        const { session_id } = req.params;
        const session = await getSessionById(session_id);

        if (!session) {
            return res.status(404).json({ success: false, message: 'Session not found' });
        }

        return res.status(200).json(session);
    } catch (error) {
        console.error('Error in getSession:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    addSession,
    getSession,

};
