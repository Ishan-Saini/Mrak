const fileEncryptAndUpload = require('../util/fileUtil/fileEncryptAndUpload');
const fileDecryptAndDownload = require('../util/fileUtil/fileDecryptAndDownload');

let pth;

exports.encrypt = (req, res, next) => {
  fileEncryptAndUpload(req.file.path, 'dogzrgr8');
  pth = req.file.path;
  res.status(200).json({
    status: 'success',
  });
};

exports.decrypt = (req, res, next) => {
  fileDecryptAndDownload(pth, 'dogzrgr8');

  res.status(200).json({
    status: 'success',
  });
};
