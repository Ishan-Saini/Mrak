const express = require('express');
const upload = require('../util/saveToDisk');

const fileController = require('../controllers/fileController');

const router = express.Router();

router.post('/upload', upload.single('mrak-upload'), fileController.encrypt);
router.post('/download', fileController.decrypt);

module.exports = router;
