const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});


// Upload document
exports.uploadDocument = async (session_id, user_id, name, loanProposerName, file) => {
  const query = `
    INSERT INTO final_documents 
      (session_id, user_id, name, "loanProposerName", file_name, file_type, data) 
    VALUES ($1,$2,$3,$4,$5,$6,$7)
  `;
  await pool.query(query, [
    session_id,
    user_id,
    name,
    loanProposerName,
    file.originalname,
    file.mimetype,
    file.buffer
  ]);
};

// Get user by ID
exports.getUserById = async (user_id) => {
  const result = await pool.query('SELECT user_id, name FROM users WHERE user_id = $1', [user_id]);
  return result.rows[0];
};

// Get user by name
exports.getUserByName = async (name) => {
  const result = await pool.query(
    'SELECT user_id, name FROM users WHERE name = $1 LIMIT 1',
    [name]
  );
  return result.rows[0];
};

// Get latest session for a user
// Get latest session from final_documents for a user
exports.getLatestSessionByUser = async (user_id) => {
  const result = await pool.query(
    `SELECT session_id, "loanProposerName"
     FROM final_documents
     WHERE user_id = $1
     ORDER BY uploaded_at DESC
     LIMIT 1`,
    [user_id]
  );
  return result.rows[0];
};

// Get documents by user_id
exports.getDocumentsByUserId = async (user_id) => {
  const result = await pool.query(
    'SELECT * FROM final_documents WHERE user_id = $1 ORDER BY uploaded_at DESC',
    [user_id]
  );
  return result.rows;
};

// Get document by ID
exports.getDocumentById = async (doc_id) => {
  const result = await pool.query('SELECT * FROM final_documents WHERE doc_id = $1', [doc_id]);
  return result.rows[0];
};
