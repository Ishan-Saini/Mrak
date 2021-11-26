const crypto = require('crypto');
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

const generateKey = require('./generateKey');

const decryptFileAndDownload = (filePath, password) => {
  filePath = filePath.replace(path.extname(filePath), '.enc');
  const readIvStream = fs.createReadStream(filePath, { end: 15 });

  let initVector;
  readIvStream.on('data', (chunk) => {
    initVector = chunk;
  });

  readIvStream.on('close', () => {
    const key = generateKey(password);
    const readStream = fs.createReadStream(filePath, { start: 16 });
    const unzip = zlib.createUnzip();
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, initVector);

    filePath = filePath.replace(path.extname(filePath), '.png');
    const writeStream = fs.createWriteStream(filePath);

    readStream.pipe(decipher).pipe(unzip).pipe(writeStream);
  });
};

module.exports = decryptFileAndDownload;
