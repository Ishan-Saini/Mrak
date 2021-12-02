const crypto = require('crypto');
const zlib = require('zlib');
const path = require('path');
const mongoose = require('mongoose');
const streamifier = require('streamifier');

const AppendInitVector = require('../util/fileUtil/AppendInitVector');
const asyncUtility = require('../util/asyncUtility');
const ErrorClass = require('../util/errorUtility');
const generateKey = require('../util/fileUtil/generateKey');
const User = require('../models/userModel');

const getBucket = () => {
  const gridFsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads',
  });

  return gridFsBucket;
};

const checkPassword = async (req) => {
  const userId = req.user.id;
  const user = await User.findById(userId).select('+password');

  return await user.checkPassword(req.body.password, user.password);
};

// ENCRYPTION AND UPLOAD

exports.upload = asyncUtility(async (req, res, next) => {
  if (!(await checkPassword(req)))
    return next(new ErrorClass('Failed: Incorrect password', 401));

  const gridFsBucket = getBucket();
  const file = req.files['mrak-upload'];

  //Create an initialization vector
  const initVector = crypto.randomBytes(16);

  //Generate a cipher key
  const key = generateKey(req.body.password);
  const gzip = zlib.createGzip();
  const appendInitVector = new AppendInitVector(initVector);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, initVector);

  const originalname = file.name;
  const filename = file.name.replace(path.extname(file.name), '.enc');

  const readStream = streamifier.createReadStream(file.data);

  const writeStream = gridFsBucket.openUploadStream(filename, {
    metadata: {
      originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      size: file.size,
      user: req.user._id,
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
  if (!(await checkPassword(req)))
    return next(new ErrorClass('Failed: Incorrect password', 401));

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

  const query = gridFsBucket.find({
    'metadata.user': mongoose.Types.ObjectId(req.user.id),
  });
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
