const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
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


const app = express();
const port = 3000;



// Middleware
app.use(bodyParser.json());

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


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
