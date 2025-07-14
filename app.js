// app.js
const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const multer = require('multer');


const authRoutes = require('./routes/authRoutes');
const authenticate = require('./middleware/authenticate');  // JWT Authentication Middleware
const sessionRoutes = require('./routes/sessionRoutes');
const linkdocRoutes = require('./routes/linkdocRoutes');
const combinedRoutes = require('./routes/combinedRoutes');
const app = express();
const port = 3000;



// Middleware setup
app.use(express.json());  // To parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // To parse URL-encoded bodies
app.use(cors());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    }
}));

app.use('/api', authRoutes);  // Login/Register routes (to get JWT)
app.use('/api', authenticate);  // JWT authentication middleware for the routes below
app.use('/api', sessionRoutes);
app.use('/api', linkdocRoutes);
app.use('/api', combinedRoutes);



// Error handling middleware
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
