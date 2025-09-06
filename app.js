const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json'); // generated file
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const authenticate = require('./middleware/authenticate');

const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const linkdocRoutes = require('./routes/linkdocRoutes');
const combinedRoutes = require('./routes/combinedRoutes');
const finalDocumentsRoutes = require('./routes/finalDocumentsRoutes');//blob doc(finaldoc)
const docxtemplatorRoutes = require('./routes/DocxtemplatorRoutes'); // Ensure correct path

const app = express();
const port = 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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


// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


// Public routes: frontend and backend signup/login (no auth)
app.use('/api/auth', authRoutes);

// Protected routes (require authentication)
app.use('/api/session', authenticate, sessionRoutes);
app.use('/api/linkdoc', authenticate, linkdocRoutes);
app.use('/api/combined', authenticate, combinedRoutes);
app.use('/api/finaldoc', finalDocumentsRoutes);//blob final doc
app.use('/api', docxtemplatorRoutes); // Prefix all routes with /api


// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
   console.log(`📄 Swagger UI available at http://localhost:${port}/api-docs`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});

module.exports = app;