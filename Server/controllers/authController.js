const jwt = require('jsonwebtoken');

const asyncUtility = require('../util/asyncUtility');
const User = require('../models/userModel');

const generateJwt = async (user, res, statusCode) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = asyncUtility(async (req, res, next) => {});
