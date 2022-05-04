const express = require('express');

const fileController = require('../controllers/fileController');

const router = express.Router();

router.get('/', fileController.getAll);
router.post('/upload', fileController.upload);
router.post('/download/:id', fileController.download);
router.delete('/delete/:id', fileController.delete);

module.exports = router;
