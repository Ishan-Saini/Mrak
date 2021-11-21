const jwt = require('jsonwebtoken');

const asyncUtility = require('../util/asyncUtility');
const ErrorClass = require('../util/errorUtility');
const User = require('../models/userModel');

const generateJwt = async (user, res, statusCode) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  const jwtCookieConfig = {
    httpOnly: true,
    expires: process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000,
  };

  if (process.env.NODE_ENV === 'production') jwtCookieConfig.secure = true;

  res.cookie('jwt', token, jwtCookieConfig);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = asyncUtility(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  generateJwt(user, res, 201);
});

exports.login = asyncUtility(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorClass('Please provide both email and password', 400));

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.checkPassword(password, user.password)))
    return next(new ErrorClass('Invalid email or password', 401));

  generateJwt(user, res, 200);
});
