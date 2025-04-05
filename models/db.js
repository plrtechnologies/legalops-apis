const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables from .env

// ✅ Create a connection pool using .env variables
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for cloud-hosted PostgreSQL
});

// ✅ Test the connection
pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL database!"))
    .catch((err) => console.error("❌ Database connection error:", err));

module.exports = pool;
