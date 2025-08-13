const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const User = {
  findByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  findById: async (userId) => {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    return result.rows[0];
  },

  create: async (name, email, password, role = 'frontend') => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING user_id, name, email, role',
      [name, email, hashedPassword, role]
    );
    return result.rows[0];
  },

  validatePassword: async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
  }
};

module.exports = User;
