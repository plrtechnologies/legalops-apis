const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const loanProposerRoutes = require('./routes/loanProposerRoutes');
const TtileHolderRoutes = require('./routes/TitleHolderRoutes');


const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/api', loanProposerRoutes);
app.use('/api',TtileHolderRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
