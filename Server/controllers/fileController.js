const crypto = require('crypto');
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const AppendInitVector = require('../util/fileUtil/AppendInitVector');
const asyncUtility = require('../util/asyncUtility');
const ErrorClass = require('../util/errorUtility');
const generateKey = require('../util/fileUtil/generateKey');

const getBucket = () => {
  const gridFsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads',
  });

  return gridFsBucket;
};

// ENCRYPTION AND UPLOAD

exports.upload = asyncUtility(async (req, res, next) => {
  const gridFsBucket = getBucket();

  //Create an initialization vector
  const initVector = crypto.randomBytes(16);

  //Generate a cipher key
  const key = generateKey(req.body.password);
  const gzip = zlib.createGzip();
  const appendInitVector = new AppendInitVector(initVector);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, initVector);
  const readStream = fs.createReadStream(req.file.path);

  readStream.on('end', () => {
    fs.unlink(req.file.path, (err) => {
      if (err) return new Error('Error deleting files');
    });
  });

  const filename = req.file.originalname.replace(
    path.extname(req.file.originalname),
    '.enc'
  );

  const writeStream = gridFsBucket.openUploadStream(filename, {
    metadata: {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      size: req.file.size,
    },
  });

  readStream
    .pipe(gzip)
    .pipe(cipher)
    .pipe(appendInitVector)
    .pipe(writeStream)
    .on('error', (err) => next(new ErrorClass(`${err}`, 500)))
    .on('finish', () => {
      res.status(200).json({
        status: 'success',
        message: 'File uploaded successfully',
      });
    });
});

// DECRYPTION AND DOWNLOAD

exports.download = asyncUtility(async (req, res, next) => {
  const gridFsBucket = getBucket();

  const query = gridFsBucket.find({
    _id: mongoose.Types.ObjectId(req.params.id),
  });
  const fileArray = await query.toArray();

  const readIvStream = gridFsBucket.openDownloadStream(
    mongoose.Types.ObjectId(req.params.id),
    {
      end: 16,
    }
  );

  let initVector;
  readIvStream.on('data', (chunk) => {
    initVector = chunk;
  });

  readIvStream.on('close', () => {
    const key = generateKey(req.body.password);
    const readStream = gridFsBucket.openDownloadStream(
      mongoose.Types.ObjectId(req.params.id),
      {
        start: 16,
      }
    );
    const unzip = zlib.createUnzip();
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, initVector);

    res.set('Content-Type', fileArray[0].metadata.mimetype);
    res.set(
      'Content-Disposition',
      `attachment; filename="${fileArray[0].metadata.originalname}"`
    );

    readStream
      .pipe(decipher)
      .pipe(unzip)
      .on('error', (err) => next(new ErrorClass(`${err}`, 500)))
      .pipe(res);
  });
});

// GET ALL FILES

exports.getAll = asyncUtility(async (req, res, next) => {
  const gridFsBucket = getBucket();

  const query = gridFsBucket.find({});
  const files = await query.toArray();

  res.status(200).json({
    status: 'success',
    data: {
      files,
    },
  });
});

// DELETION

exports.delete = asyncUtility(async (req, res, next) => {
  const gridFsBucket = getBucket();

  gridFsBucket.delete(mongoose.Types.ObjectId(req.params.id), (err) =>
    next(new ErrorClass(`${err}`, 500))
  );

  res.status(200).json({
    status: 'success',
    message: 'File deleted successfully',
  });
});
