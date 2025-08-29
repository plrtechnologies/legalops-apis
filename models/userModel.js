const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const User = {
  // Find by email (for login & signup duplicate check)
  findByEmail: async (email) => {
    const result = await pool.query(
      'SELECT user_id, name, email, password FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  },

  // Find by user_id (for profile/session restore)
  findById: async (userId) => {
    const result = await pool.query(
      'SELECT user_id, name, email FROM users WHERE user_id = $1',
      [userId]
    );
    return result.rows[0];
  },

  // Create a new user
  create: async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING user_id, name, email',
      [name, email, hashedPassword]
    );
    return result.rows[0];
  },

  // Compare password with hash
  validatePassword: async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
  }
};

module.exports = User;
