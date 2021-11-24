const crypto = require('crypto');

exports.generateKey = (password) => {
  crypto.createHash('sha256').update(password).digest();
};
