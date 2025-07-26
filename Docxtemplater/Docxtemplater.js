// const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const PizZip = require("pizzip");
// const Docxtemplater = require("docxtemplater");
// const pool = require("../models/db"); // Import PostgreSQL connection
// const content = fs.readFileSync("./template.docx", "binary");


// const router = express.Router();

// // ✅ Route 1: Fetch all sessions from the database
// router.get("/sessions", async (req, res) => {
//     try {
//         const result = await pool.query("SELECT * FROM sessions"); // Change "sessions" to your actual table name
//         res.json(result.rows);
//     } catch (error) {
//         console.error("❌ Error fetching sessions:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// // ✅ Route 2: Generate a Word document for a session
// router.get("/generate-word/:sessionId", async (req, res) => {
//     const sessionId = req.params.sessionId;

//     try {
//         // Fetch session data from PostgreSQL
//         const sessionData = await pool.query("SELECT * FROM sessions WHERE session_id = $1", [sessionId]);

//         if (sessionData.rows.length === 0) {
//             return res.status(404).json({ error: "Session not found" });
//         }

//         // Load the Word template (Ensure 'template.docx' is in the root directory)
//         const templatePath = path.join(__dirname, "../template.docx");
//         const content = fs.readFileSync(templatePath, "binary");
//         const zip = new PizZip(content);
//         const doc = new Docxtemplater(zip);

//         // Replace placeholders with session data
//        // doc.setData(sessionData.rows[0]);
//        await doc.renderAsync(result.rows[0]); // PostgreSQL returns data inside `.rows`

//         // Process the document
//         doc.render();
//         const buffer = doc.getZip().generate({ type: "nodebuffer" });

//         // Generate a unique filename
//         const outputFileName = `session_${sessionId}.docx`;
//         const outputPath = path.join(__dirname, "../generated_docs", outputFileName);

//         // Ensure the directory exists
//         if (!fs.existsSync(path.join(__dirname, "../generated_docs"))) {
//             fs.mkdirSync(path.join(__dirname, "../generated_docs"));
//         }

//         // Save the file
//         fs.writeFileSync(outputPath, buffer);

//         // Send file for download
//         res.download(outputPath, (err) => {
//             if (err) {
//                 console.error("Error sending file:", err);
//             }
//             // Delete file after sending to save space
//             fs.unlinkSync(outputPath);
//         });

//     } catch (error) {
//         console.error("❌ Error generating document:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// module.exports = router;


/*
const express = require("express");
const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const pool = require("../models/db"); // PostgreSQL connection
const content1 = fs.readFileSync("./template.docx", "binary");
const router = express.Router();

// // ✅ Route 1: Fetch all sessions from the database
 router.get("/sessions", async (req, res) => {
     try {
         const result = await pool.query("SELECT * FROM sessions"); // Change "sessions" to your actual table name
         res.json(result.rows);
     } catch (error) {
         console.error("❌ Error fetching sessions:", error);
         res.status(500).json({ error: "Internal Server Error" });
     }
 });
// Route to generate a Word document per session
router.get("/generate-word/:sessionId", async (req, res) => {
    const sessionId = req.params.sessionId;

    try {
        // ✅ Fetch session data correctly
        const { rows } = await pool.query("SELECT * FROM sessions WHERE session_id = $1", [sessionId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Session not found" });
        }

        // Load the Word template
        const templatePath = "C:/Users/ratna/OneDrive/Desktop/legalops-apis/template.docx"; // Ensure correct path
        if (!fs.existsSync(templatePath)) {
            return res.status(404).json({ error: "Template file not found" });
        }

        const content = fs.readFileSync(templatePath, "binary");
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip);

        // ✅ Use correct session data
        await doc.renderAsync(rows[0]);

        // Generate document buffer
        const buffer = doc.getZip().generate({ type: "nodebuffer" });

        const outputFileName = `session_${sessionId}.docx`;
        fs.writeFileSync(outputFileName, buffer);

        // Send file for download
        res.download(outputFileName, (err) => {
            if (err) console.error("❌ Error sending file:", err);
            fs.unlinkSync(outputFileName); // Delete file after sending
        });

    } catch (error) {
        console.error("❌ Error generating document:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
*/
const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const pool = require("../models/db");

// ✅ Fetch all sessions
const getAllSessions = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM sessions");
        res.json(result.rows);
    } catch (error) {
        console.error("❌ Error fetching sessions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Generate Word document by session ID
const generateWordBySessionId = async (req, res) => {
    const sessionId = req.params.sessionId;

    try {
        const { rows } = await pool.query("SELECT * FROM sessions WHERE session_id = $1", [sessionId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Session not found" });
        }

        const templatePath = path.join(__dirname, "../template.docx");
        if (!fs.existsSync(templatePath)) {
            return res.status(404).json({ error: "Template file not found" });
        }

        const content = fs.readFileSync(templatePath, "binary");
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

        doc.setData(rows[0]);
        doc.render();

        const buffer = doc.getZip().generate({ type: "nodebuffer" });
        const outputFileName = `session_${sessionId}.docx`;
        const outputPath = path.join(__dirname, "../generated_docs", outputFileName);

        if (!fs.existsSync(path.dirname(outputPath))) {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        }

        fs.writeFileSync(outputPath, buffer);

        res.download(outputPath, (err) => {
            if (err) console.error("❌ Error sending file:", err);
            fs.unlinkSync(outputPath);
        });

    } catch (error) {
        console.error("❌ Error generating document:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Generate Word document by username (loanProposerName)
const generateWordByUsername = async (req, res) => {
    const username = req.params.loanProposerName;

    try {
        const { rows } = await pool.query(
            'SELECT * FROM sessions WHERE "loanProposerName" = $1',
            [username]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const templatePath = path.join(__dirname, "../template.docx");
        if (!fs.existsSync(templatePath)) {
            return res.status(404).json({ error: "Template file not found" });
        }

        const content = fs.readFileSync(templatePath, "binary");
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

        doc.setData(rows[0]);
        doc.render();

        const buffer = doc.getZip().generate({ type: "nodebuffer" });
        const outputFileName = `session_${username}.docx`;
        const outputPath = path.join(__dirname, "../generated_docs", outputFileName);

        if (!fs.existsSync(path.dirname(outputPath))) {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        }

        fs.writeFileSync(outputPath, buffer);

        res.download(outputPath, (err) => {
            if (err) console.error("❌ Error sending file:", err);
            fs.unlinkSync(outputPath);
        });

    } catch (error) {
        console.error("❌ Error generating document by username:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getAllSessions,
    generateWordBySessionId,
    generateWordByUsername
};
