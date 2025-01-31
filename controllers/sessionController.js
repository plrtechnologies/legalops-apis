const { createLoanProposer, getLoanProposers } = require('../models/loanProposerModel');
const { createPropDetail, getPropDetails } = require('../models/propdetailsModel');
const { createEc, getEc } = require('../models/EcModel');
const { createGiftDeed, getGiftDeed } = require('../models/GiftDeedModel');
const { createHouseTaxDemandNotice, getHouseTaxDemandNotice } = require('../models/HouseTaxDemandNoticeModel');
const { createHouseTaxReceipt, getHouseTaxReceipt } = require('../models/HouseTaxReceiptModel');
const { createMortgageDeed, getMortgageDeed } = require('../models/MortgageDeedModel');
const { createPartitionDeed, getPartitionDeed } = require('../models/PartitionDeedModel');
const { createRelinquishDeed, getRelinquishDeed } = require('../models/RelinquishDeedModel');
const { createSaleDeed, getSaleDeed } = require('../models/SaleDeedModel');
const { createWillDeed, getWillDeed } = require('../models/WillDeedModel');
const { createTitleHolder, getTitleHolder } = require('../models/TitleHolderModel');
const { createPropertyBoundary, getPropertyBoundaries } = require('../models/PropertyBoundaryModel');
const { createMostRecentDoc, getMostRecentDocs } = require('../models/MostRecentDocumentModel');


const addSession = async (req, res) => {
    const { type, data } = req.body;

    try {
        let result;

        // Check the 'type' field in the request body and handle accordingly
        switch (type) {
            case 'loanProposer':
                result = await createLoanProposer(data);  // Call the loanProposer model
                break;
            case 'propertyDetails':
                result = await createPropDetail(data);  // Call the propertyDetails model
                break;
                case 'Ec':
                result = await createEc(data);  // Call the propertyDetails model
                break;
                case 'GiftDeed':
                    result = await createGiftDeed(data);  // Call the propertyDetails model
                    break;
                    case 'HouseTaxDemandNotice':
                    result = await createHouseTaxDemandNotice(data);  // Call the propertyDetails model
                    break;
                    case 'HouseTaxReceipt':
                    result = await createHouseTaxReceipt(data);  // Call the propertyDetails model
                    break;
                    case 'MortgageDeed':
                    result = await createMortgageDeed(data);  // Call the propertyDetails model
                    break;
                    case 'PartitionDeed':
                    result = await createPartitionDeed(data);  // Call the propertyDetails model
                    break;
                    case 'RelinquishDeed':
                    result = await createRelinquishDeed(data);  // Call the propertyDetails model
                    break;
                    case 'SaleDeed':
                    result = await createSaleDeed(data);  // Call the propertyDetails model
                    break;
                    case 'WillDeed':
                    result = await createWillDeed(data);  // Call the propertyDetails model
                    break;
                    case 'TitleHolder':
                    result = await createTitleHolder(data);  // Call the propertyDetails model
                    break;
                    case 'PropertyBoundary':
                    result = await createPropertyBoundary(data);  // Call the propertyDetails model
                    break;
                    case 'MostRecentDocument':
                    result = await createMostRecentDoc(data);  // Call the propertyDetails model
                    break;
            // Add more cases for other data types (e.g., titleHolder, mortgageDeed, etc.)
            default:
                return res.status(400).send({
                    statusCode: 400,
                     message: 'Invalid type' });
        }

        // Send back a message and the result of the data processed
        res.status(200).send({
            statusCode: 200,
            message: 'Data added successfully',
            data: result  // Returning the result (either the inserted/updated data or whatever the model returns)
        });
    } catch (err) {
        console.error('Error adding loan proposer:', err.stack);
        res.status(500).send({
          statusCode: 500,
          message: 'Error adding loan proposer',
          error: err.stack
        });
      }
    };
    // GET API to retrieve all session data
    const getSessionData = async (req, res) => {
        const { session_id } = req.query;  // Extract session_id from query params
    
        if (!session_id) {
            return res.status(400).json({ message: 'session_id is required' });
        }
    try {
        // Fetch all types of data from their respective models
        const loanProposers = await getLoanProposers(session_id);
        const propertyDetails = await getPropDetails(session_id);
        const ecs = await getEc(session_id);
        const giftDeeds = await getGiftDeed(session_id);
        const houseTaxDemandNotices = await getHouseTaxDemandNotice(session_id);
        const houseTaxReceipts = await getHouseTaxReceipt(session_id);
        const mortgageDeeds = await getMortgageDeed(session_id);
        const partitionDeeds = await getPartitionDeed(session_id);
        const relinquishDeeds = await getRelinquishDeed(session_id);
        const saleDeeds = await getSaleDeed(session_id);
        const willDeeds = await getWillDeed(session_id);
        const titleHolders = await getTitleHolder(session_id);
        const propertyBoundaries = await getPropertyBoundaries(session_id);
        const mostRecentDocs = await getMostRecentDocs(session_id);

         // Combine all session data into a single object
         const sessionData = {};

          // Only include data if it exists for that session_id (prevents empty arrays if no data exists)
          if (loanProposers.length > 0) sessionData.loanProposers = loanProposers;
          if (propertyDetails.length > 0) sessionData.propertyDetails = propertyDetails;
          if (ecs.length > 0) sessionData.ecs = ecs;
          if (giftDeeds.length > 0) sessionData.giftDeeds = giftDeeds;
          if (houseTaxDemandNotices.length > 0) sessionData.houseTaxDemandNotices = houseTaxDemandNotices;
          if (houseTaxReceipts.length > 0) sessionData.houseTaxReceipts = houseTaxReceipts;
          if (mortgageDeeds.length > 0) sessionData.mortgageDeeds = mortgageDeeds;
          if (partitionDeeds.length > 0) sessionData.partitionDeeds = partitionDeeds;
          if (relinquishDeeds.length > 0) sessionData.relinquishDeeds = relinquishDeeds;
          if (saleDeeds.length > 0) sessionData.saleDeeds = saleDeeds;
          if (willDeeds.length > 0) sessionData.willDeeds = willDeeds;
          if (titleHolders.length > 0) sessionData.titleHolders = titleHolders;
          if (propertyBoundaries.length > 0) sessionData.propertyBoundaries = propertyBoundaries;
          if (mostRecentDocs.length > 0) sessionData.mostRecentDocs = mostRecentDocs;
       
       
          // Respond with the session data
        res.status(200).send({
            statusCode: 200,
             message: 'Session data retrieved successfully', data: sessionData });
            } catch (err) {
                console.error('Error retrieving loan proposers:', err.stack);
                res.status(500).send({
                  statusCode: 500,
                  message: 'Error retrieving loan proposers',
                  error: err.stack
                });
              }
            };

module.exports = { addSession, getSessionData };