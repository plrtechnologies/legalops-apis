const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const cors = require('cors');

<<<<<<< HEAD
const setupSwagger = require('./sweag/swagger'); // Swagger setup function

=======
>>>>>>> 4ddd358db2e5bac803361f2e26005cb2ee1a8637

const loanProposerRoutes = require('./routes/loanProposerRoutes');
const propdetailsRoutes = require('./routes/propdetailsRoutes');
const TtileHolderRoutes = require('./routes/TitleHolderRoutes');
const GiftDeedRoutes = require('./routes/GiftDeedRoutes');
const SaleDeedRoutes = require('./routes/SaleDeedRoutes');
const RelinquishDeedRoutes = require('./routes/RelinquishDeedRoutes');
const PartitionDeedRooutes = require('./routes/PartitionDeedRooutes');
const MortgageDeedRoutes = require('./routes/MortgageDeedRoutes');
const WillDeedRoutes = require('./routes/WillDeedRoutes');
const EcRoutes = require('./routes/EcRoutes');
const HouseTaxReceiptRoutes = require('./routes/HouseTaxReceiptRoutes');
const HouseTaxDemandNoticeRoutes = require('./routes/HouseTaxDemandNoticeRoutes');
const PropertyBoundaryRoutes = require('./routes/PropertyBoundaryRoutes');
const authRoutes = require('./routes/authRoutes');
<<<<<<< HEAD
=======
const authenticate = require('./middleware/authenticate');  // JWT Authentication Middleware
>>>>>>> 4ddd358db2e5bac803361f2e26005cb2ee1a8637
const MostRecentDocumentRoutes = require('./routes/MostRecentDocumentRoutes');

const app = express();
const port = 3000;
// Middleware
app.use(express.json());  // To parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // To parse URL-encoded bodies
app.use(bodyParser.json());
app.use(cors());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Use an environment variable or a secret string
    resave: false,  // Don't save session if unmodified
    saveUninitialized: false,  // Don't save empty sessions
    cookie: {
      maxAge: 3600000,  // 1 hour in milliseconds (3600000 ms = 1 hour)
      httpOnly: true,  // Prevent client-side JS from accessing the cookie
      secure: process.env.NODE_ENV === 'production',  // Set to true in production for HTTPS
    }
  })
);

// Setup Swagger documentation
setupSwagger(app); // This initializes Swagger

// Public routes (No JWT authentication required)
app.use('/api', authRoutes);  // Login/Register routes (to get JWT)

// Protected routes (JWT authentication required)
app.use('/api', authenticate);  // This will authenticate JWT for any following routes


// Use routes
app.use('/api', loanProposerRoutes);
app.use('/api', propdetailsRoutes);
app.use('/api',TtileHolderRoutes);
app.use('/api',GiftDeedRoutes);
app.use('/api',SaleDeedRoutes);
app.use('/api',RelinquishDeedRoutes);
app.use('/api',PartitionDeedRooutes);
app.use('/api',MortgageDeedRoutes);
app.use('/api',WillDeedRoutes);
app.use('/api',EcRoutes);
app.use('/api',HouseTaxReceiptRoutes);
app.use('/api',HouseTaxDemandNoticeRoutes);
app.use('/api',PropertyBoundaryRoutes);
app.use('/api',MostRecentDocumentRoutes);
<<<<<<< HEAD
app.use('/api', authRoutes);
=======

>>>>>>> 4ddd358db2e5bac803361f2e26005cb2ee1a8637

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
  });
  
  // Global error handler
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
  
<<<<<<< HEAD
=======

>>>>>>> 4ddd358db2e5bac803361f2e26005cb2ee1a8637
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`API docs available at http://localhost:${port}/api-docs`);
  });