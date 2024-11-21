const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const loanProposerRoutes = require('./routes/loanProposerRoutes');


const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/api', loanProposerRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
