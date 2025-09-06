const express = require('express');
const router = express.Router();
const controller = require('../controllers/finalDocumentsController');
const multer = require('multer');
const upload = multer(); // memory storage
const authenticate = require('../middleware/authenticate');

router.use(authenticate);

// POST upload
router.post(
  '/upload',
  upload.single('file'),
  controller.uploadDocument
  /* #swagger.tags = ['FinalDocuments'] 
     #swagger.summary = 'Upload a new final document' 
     #swagger.consumes = ['multipart/form-data'] 
     #swagger.parameters['file'] = { description: 'File to upload', type: 'file', required: true } 
     #swagger.security = [{ "bearerAuth": [] }] */
);

// GET by user name
router.get(
  '/user/:name',
  controller.getDocumentsByUserName
  /* #swagger.tags = ['FinalDocuments'] 
     #swagger.summary = 'Get final documents by user name' 
     #swagger.parameters['name'] = { description: 'User name', type: 'string', required: true } 
     #swagger.security = [{ "bearerAuth": [] }] */
);

// GET download
router.get(
  '/download/:doc_id',
  controller.downloadDocument
  /* #swagger.tags = ['FinalDocuments'] 
     #swagger.summary = 'Download a final document by doc_id' 
     #swagger.parameters['doc_id'] = { description: 'Document ID', type: 'string', required: true } 
     #swagger.security = [{ "bearerAuth": [] }] */
);

module.exports = router;
