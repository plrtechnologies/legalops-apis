const fs = require('fs');
const path = require('path');
const model = require('../models/finalDocumentsModel');

// POST upload (user_id + file)
exports.uploadDocument = async (req, res) => {
  try {
    const { user_id } = req.body;
    const file = req.file;

    if (!user_id || !file) {
      return res.status(400).json({ error: "user_id and file are required" });
    }

    // Get user info
    const user = await model.getUserById(user_id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Get latest session info
    const session = await model.getLatestSessionByUser(user_id);
    if (!session) return res.status(404).json({ error: "No session found for this user" });

    // Save file in DB
    await model.uploadDocument(
      session.session_id,
      user_id,
      user.name,
      session.loanProposerName,
      file
    );

    res.status(201).json({ message: "File uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
};

// GET documents by user name
exports.getDocumentsByUserName = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ error: "User name is required" });
    }

    // Find user in users table
    const user = await model.getUserByName(name);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch docs for this user_id
    const docs = await model.getDocumentsByUserId(user.user_id);

    const withUrls = docs.map(doc => ({
      doc_id: doc.doc_id,
      name: doc.name,
      loanProposerName: doc.loanProposerName,
      uploaded_at: doc.uploaded_at 
        ? new Date(doc.uploaded_at).toISOString().split("T")[0] // only date
        : null,
      download_url: `${req.protocol}://${req.get('host')}/api/finaldoc/download/${doc.doc_id}`
    }));

    res.json(withUrls);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Fetch failed" });
  }
};

// GET download
exports.downloadDocument = async (req, res) => {
  try {
    const { doc_id } = req.params;

    const doc = await model.getDocumentById(doc_id);
    if (!doc) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Save locally
    const downloadPath = path.join(__dirname, '../downloads', doc.file_name);
    fs.writeFileSync(downloadPath, doc.data);

    // Open in browser / download prompt
    res.download(downloadPath, doc.file_name, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        return res.status(500).json({ error: "Could not download file" });
      }
      console.log(`File saved locally & sent: ${downloadPath}`);
    });

  } catch (err) {
    console.error("Download error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
