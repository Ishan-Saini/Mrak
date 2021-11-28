const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const asyncUtility = require('../util/asyncUtility');
const ErrorClass = require('../util/errorUtility');
const User = require('../models/userModel');

const generateJwt = (user, res, statusCode) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  const jwtCookieConfig = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000
    ),
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

exports.protect = asyncUtility(async (req, res, next) => {
  let token;

  if (
    // For development purpose
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    // Check for cookie
    token = req.cookies.jwt;
  }

  if (!token)
    return next(
      new ErrorClass('Authentication failed! Please login/signup', 401)
    );

  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_PRIVATE_KEY
  );

  const user = await User.findById(decodedToken.id);

  if (!user)
    return next(
      new ErrorClass('No user found with that token. Please login again!', 401)
    );

  if (user.isPasswordChanged(decodedToken.iat))
    return next(
      new ErrorClass('Password recently changed. Please login again!', 401)
    );

  req.user = user;

  next();
});

exports.checkUser = asyncUtility(async (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_PRIVATE_KEY
    );

    const loggedInUser = await User.findById(decoded.id);

    if (!loggedInUser)
      return next(new ErrorClass('This user has been deleted!', 401));

    if (loggedInUser.isPasswordChanged(decoded.iat)) {
      return next(
        new ErrorClass(
          'Password has been changed recently, please log in again!',
          401
        )
      );
    }

    res.status(200).json({
      message: 'success',
      data: {
        user: loggedInUser,
      },
    });
  } else {
    return next(new ErrorClass('Please login!', 401));
  }
});

exports.logout = asyncUtility(async (req, res, next) => {
  res.cookie('jwt', 'userLoggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
  });
});
