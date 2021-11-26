const crypto = require('crypto');
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

const AppendInitVector = require('./AppendInitVector');
const generateKey = require('./generateKey');

const fileEncryptAndUpload = (filePath, password) => {
  //Create an initialization vector
  const initVector = crypto.randomBytes(16);

  //Generate a cipher key
  const key = generateKey(password);
  const gzip = zlib.createGzip();
  const appendInitVector = new AppendInitVector(initVector);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, initVector);
  const readStream = fs.createReadStream(filePath);

  filePath = filePath.replace(path.extname(filePath), '.enc');
  const writeStream = fs.createWriteStream(filePath);

  readStream.pipe(gzip).pipe(cipher).pipe(appendInitVector).pipe(writeStream);
};

module.exports = fileEncryptAndUpload;
