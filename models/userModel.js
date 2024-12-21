
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const User = {
  // Check if a user already exists by email
  findByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];  // Return the user or undefined if not found
  },

  // Create a new user in the database
  create: async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    return result.rows[0];  // Return the created user
  },

  
  // Validate password
  validatePassword: async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);  
},

// Find a user by ID
findById: async (userId) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
  return result.rows[0];
}
};
module.exports = User;


