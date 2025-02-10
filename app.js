const express = require('express');
const swaggerUi = require('swagger-ui-express');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const authRoutes = require('./routes/authRoutes');
const authenticate = require('./middleware/authenticate'); 
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();
const port = 3000;

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  
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

app.use('/api', authRoutes);  
app.use('/api', authenticate);
app.use('/api', sessionRoutes);

// 🔹 Add Swagger JSON File for API Documentation
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger UI available at http://localhost:${port}/api-docs`); // 🔹 Log Swagger URL
});
