// const express = require('express');
// const router = express.Router();
// const Docxtemplater = require('../Docxtemplater/Docxtemplater'); // Ensure correct import

// // Define the GET route for generating Word documents
// router.get('/generate-word/:sessionId', async (req, res) => {
//     const sessionId = req.params.sessionId;

//     try {
//         const generatedFilePath = await Docxtemplater.generateWordDocument(sessionId);
//         res.download(generatedFilePath);
//     } catch (error) {
//         console.error("❌ Error generating document:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// module.exports = router;

const express = require("express");
const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const pool = require("../models/db"); // PostgreSQL connection

const router = express.Router();

// ✅ Route 1: Fetch all sessions from the database
router.get("/sessions", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM sessions");
        res.json(result.rows);
    } catch (error) {
        console.error("❌ Error fetching sessions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Route 2: Generate a Word document for a specific session
router.get("/generate-word/:sessionId", async (req, res) => {
    const sessionId = req.params.sessionId;

    try {
        // ✅ Fetch session data correctly
        const { rows } = await pool.query("SELECT * FROM sessions WHERE session_id = $1", [sessionId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Session not found" });
        }

        // ✅ Use relative path for template file
        const templatePath = path.join(__dirname, "../template.docx");

        if (!fs.existsSync(templatePath)) {
            return res.status(404).json({ error: "Template file not found" });
        }

        const content = fs.readFileSync(templatePath, "binary");
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip);

        // ✅ Ensure correct placeholders in template
        doc.setData({
            sessionId: rows[0].session_id,
            sessionName: rows[0].session_name, // Example: Ensure column names match DB
            sessionDate: rows[0].session_date
        });

        await doc.renderAsync(); // ✅ No need to pass an object here

        // Generate document buffer
        const buffer = doc.getZip().generate({ type: "nodebuffer" });

        const outputFileName = `session_${sessionId}.docx`;
        const outputPath = path.join(__dirname, "../generated_docs", outputFileName);
        fs.writeFileSync(outputPath, buffer);

        // ✅ Ensure the file is available before sending
        res.download(outputPath, outputFileName, (err) => {
            if (err) {
                console.error("❌ Error sending file:", err);
            } else {
                fs.unlinkSync(outputPath); // ✅ Delete file after sending
            }
        });

    } catch (error) {
        console.error("❌ Error generating document:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
