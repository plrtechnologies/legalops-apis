const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const loanProposerRoutes = require('./routes/loanProposerRoutes');
const propdetailsRoutes = require('./routes/propdetailsRoutes');
const TtileHolderRoutes = require('./routes/TitleHolderRoutes');
const PropertyBoundaryRoutes = require('./routes/PropertyBoundaryRoutes');
const MostRecentDocumentRoutes = require('./routes/MostRecentDocumentRoutes');

const app = express();
const port = 3000;


// Middleware
app.use(bodyParser.json());

// Use routes
app.use('/api', loanProposerRoutes);
app.use('/api', propdetailsRoutes);
app.use('/api',TtileHolderRoutes);
app.use('/api',PropertyBoundaryRoutes);
app.use('/api',MostRecentDocumentRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


