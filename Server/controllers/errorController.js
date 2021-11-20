//Send Development Error

const devErrorHandler = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Send Production Error

const prodErrorHandler = (err, res) => {
  console.log(err);
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') prodErrorHandler(err, res);
  else devErrorHandler(err, res);
};
