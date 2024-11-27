const express = require('express');
const router = express.Router();

const TitleHolderController = require('../controllers/TitleHolderController');

router.post('/title-holder', TitleHolderController.addTitleHolder);

router.get('/title-holders',TitleHolderController.retrieveTitleHolder);

module.exports = router;