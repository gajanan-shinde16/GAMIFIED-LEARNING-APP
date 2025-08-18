/**
 * Middleware to handle requests for routes that do not exist.
 * This should be placed after all other routes in server.js.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
const notFound = (req, res, next) => {
  // Create a new Error object for the non-existent route.
  const error = new Error(`Not Found - ${req.originalUrl}`);
  // Set the HTTP status code to 404 (Not Found).
  res.status(404);
  // Pass the error to the next middleware in the chain (our errorHandler).
  next(error);
};


/**
 * A global error handler middleware.
 * This will catch any errors passed by `next(error)`.
 * It must have four arguments (err, req, res, next) for Express to recognize it as an error handler.
 * @param {object} err - The error object.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
  // Determine the status code. If the response status code is 200 (OK),
  // it means an error was thrown in a successful route, so we set it to 500 (Internal Server Error).
  // Otherwise, we use the status code that was already set.
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Mongoose specific error handling for bad ObjectIds
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    statusCode = 400;
    message = `Duplicate field value entered for: ${field}. Please use another value.`;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values(err.errors).map((el) => el.message);
    message = `Invalid input data. ${errors.join('. ')}`;
  }


  // Send the final JSON response.
  res.status(statusCode).json({
    message: message,
    // Include the error stack trace only if the application is not in 'production' mode.
    // This is a security best practice to avoid leaking server details.
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };