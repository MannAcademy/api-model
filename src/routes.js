const express = require('express');
const router = express.Router();
const modelHandler = require('./handler'); // Import handler

router.get('/:bucketName/:fileName', modelHandler.loadModel);

module.exports = router;