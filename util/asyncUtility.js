// Utility to catch errors of async functions in controllers

module.exports = (func) => (req, res, next) => {
  func(req, res, next).catch((err) => next(err));
};
