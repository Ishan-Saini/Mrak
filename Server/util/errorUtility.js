class ErrorUtility extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    //Capture the stack trace and remove the constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorUtility;
