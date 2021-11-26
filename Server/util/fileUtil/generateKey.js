const crypto = require('crypto');

const generateKey = (password) =>
  crypto.createHash('sha256').update(password).digest();

module.exports = generateKey;
