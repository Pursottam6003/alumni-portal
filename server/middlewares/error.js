/**
 * Error handler middleware
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 */
function errorHandler(err, req, res, next) {
  console.error(err);
  let statusCode = 500, message = 'An error occured';
  if (err.code === 'ER_DUP_ENTRY' && err.sqlMessage.includes('email')) {
    statusCode = 400;
    message = 'Email already exists';
  }
  if (err.message.includes('Invalid API usage')) {
    statusCode = 400;
    message = err.message;
  }

  res.status(statusCode).json({ message: message, success: false });
}

module.exports = errorHandler;