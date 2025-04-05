const express = require('express');

const swaggerUi = require('swagger-ui-express');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');
const docxtemplatorRoutes = require('./routes/DocxtemplatorRoutes'); // Ensure correct path

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

// Middleware for routes
app.use('/api', authRoutes);
app.use('/api', authenticate);

app.use('/api',sessionRoutes);
app.use('/api', docxtemplatorRoutes); // Prefix all routes with /api


// 🔹 Load Swagger JSON File
const swaggerFile = './swagger.json';

// Generate Swagger JSON before starting the server
if (!fs.existsSync(swaggerFile)) {
    console.log('⚡ Generating Swagger JSON...');
    require('./swagger');
}

const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFile, 'utf8'));

// 🔹 Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📄 Swagger UI available at http://localhost:${port}/api-docs`);
});
