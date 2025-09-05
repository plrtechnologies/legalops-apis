const express = require('express');
const router = express.Router();

const {
    getAllSessions,
    generatePdfBySessionId
} = require("../Docxtemplater/Docxtemplater");

router.get("/sessions", getAllSessions);
router.get("/generate-pdf/:sessionId", generatePdfBySessionId);
module.exports = router;