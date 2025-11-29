/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Log error for debugging
  console.error(`[ERROR] ${status} - ${message}`);
  if (process.env.NODE_ENV === 'development' && err.stack) {
    console.error(err.stack);
  }

  res.status(status).json({
    success: false,
    error: {
      message,
      status,
      timestamp: new Date().toISOString()
    }
  });
};

module.exports = errorHandler;