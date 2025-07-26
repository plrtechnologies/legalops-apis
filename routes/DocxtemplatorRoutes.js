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



/*
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
*/


/*
// Route to generate a Word document per session
router.get("/generate-word/:sessionId", async (req, res) => {
    const sessionId = req.params.sessionId;

    try {
        const { rows } = await pool.query("SELECT * FROM sessions WHERE session_id = $1", [sessionId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Session not found" });
        }

        // ✅ Load and validate template
        const templatePath = path.join(__dirname, "../template.docx");
        if (!fs.existsSync(templatePath)) {
            return res.status(404).json({ error: "Template file not found" });
        }

        const content = fs.readFileSync(templatePath, "binary");
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // ✅ Proper way to render
        doc.setData(rows[0]); // Set placeholder values from DB
        doc.render(); // Synchronously render the document

        const buffer = doc.getZip().generate({ type: "nodebuffer" });

        const outputFileName = `session_${sessionId}.docx`;
        const outputPath = path.join(__dirname, "../generated_docs", outputFileName);

        if (!fs.existsSync(path.dirname(outputPath))) {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        }

        fs.writeFileSync(outputPath, buffer);

        // ✅ Send file
        res.download(outputPath, (err) => {
            if (err) console.error("❌ Error sending file:", err);
            fs.unlinkSync(outputPath); // Clean up
        });

    } catch (error) {
        console.error("❌ Error generating document:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

*/

/*
router.get("/generate-word-by-username/:loanProposerName", async (req, res) => {
    const username = req.params.loanProposerName;

    try {
        // ✅ Fetch session data by username
        const { rows } = await pool.query(
            'SELECT * FROM sessions WHERE "loanProposerName" = $1',
            [username]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // ✅ Load the template
        const templatePath = path.join(__dirname, "../template.docx");

        if (!fs.existsSync(templatePath)) {
            return res.status(404).json({ error: "Template file not found" });
        }

        const content = fs.readFileSync(templatePath, "binary");
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // ✅ Insert the session data
        doc.setData(rows[0]);
        doc.render();

        const buffer = doc.getZip().generate({ type: "nodebuffer" });

        // ✅ Name the file based on username
        const outputFileName = `session_${username}.docx`;
        const outputPath = path.join(__dirname, "../generated_docs", outputFileName);

        // Ensure folder exists
        if (!fs.existsSync(path.dirname(outputPath))) {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        }

        fs.writeFileSync(outputPath, buffer);

        // ✅ Send file to download
        res.download(outputPath, (err) => {
            if (err) console.error("❌ Error sending file:", err);
            fs.unlinkSync(outputPath);
        });

    } catch (error) {
        console.error("❌ Error generating document by username:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
module.exports = router;
*/
const express = require('express');
const router = express.Router();

const {
    getAllSessions,
    generateWordBySessionId,
    generateWordByUsername
} = require("../Docxtemplater/Docxtemplater");

router.get("/sessions", getAllSessions);
router.get("/generate-word/:sessionId", generateWordBySessionId);
router.get("/generate-word-by-username/:loanProposerName", generateWordByUsername);

module.exports = router;