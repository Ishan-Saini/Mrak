const express = require('express');

const fileController = require('../controllers/fileController');

const router = express.Router();

router.post('/upload', fileController.encrypt);
router.post('/download', fileController.decrypt);

module.exports = router;
