const express = require('express');
const router = express.Router();
const loanProposerController = require('../controllers/loanProposerController');



router.post('/loan-proposer', loanProposerController.addLoanProposer);
router.get('/loan-proposers', loanProposerController.retrieveLoanProposers);



module.exports = router;
