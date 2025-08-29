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
const authenticate = require('./middleware/authenticate');

const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const linkdocRoutes = require('./routes/linkdocRoutes');
const combinedRoutes = require('./routes/combinedRoutes');

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

// Public routes: frontend and backend signup/login (no auth)
app.use('/api/auth', authRoutes);

// Protected routes (require authentication)
app.use('/api/session', authenticate, sessionRoutes);
app.use('/api/linkdoc', authenticate, linkdocRoutes);
app.use('/api/combined', authenticate, combinedRoutes);

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
});
