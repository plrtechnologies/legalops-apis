const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const pool = require("../models/db");
const docxConverter = require("docx-pdf");  // ✅ new library

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
const generatePdfBySessionId = async (req, res) => {
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

       // doc.setData(rows[0]);
        // doc.render();
            await doc.renderAsync(rows[0]);


        const buffer = doc.getZip().generate({ type: "nodebuffer" });
        const docxFileName = `session_${sessionId}.docx`;
        const pdfFileName = `session_${sessionId}.pdf`;

        const outputFolder = path.join(__dirname, "../generated_docs");

        if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true });
       }

        const docxPath = path.join(outputFolder, docxFileName);
        const pdfPath = path.join(outputFolder, pdfFileName);

        fs.writeFileSync(docxPath, buffer);
        
        // Convert DOCX → PDF
    docxConverter(docxPath, pdfPath, (err, result) => {
      if (err) {
        console.error("❌ PDF conversion error:", err);
        return res.status(500).json({ error: "Error converting to PDF" });
      }

      // Send PDF file
      res.download(pdfPath, (err) => {
        if (err) console.error("❌ Error sending PDF:", err);
      });
    });

    } catch (error) {
        console.error("❌ Error generating document:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getAllSessions,
    generatePdfBySessionId
};