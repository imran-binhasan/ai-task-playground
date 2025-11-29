const { body, validationResult } = require('express-validator');

const validatePromptRequest = [
  body('prompt')
    .trim()
    .notEmpty().withMessage('Prompt is required')
    .isLength({ min: 2, max: 2000 }).withMessage('Prompt must be between 2 and 2000 characters'),
  
  body('model')
    .trim()
    .notEmpty().withMessage('Model is required')
    .isIn(['gpt-4o-mini', 'gpt-4o', 'gpt-4-turbo'])
    .withMessage('Model must be gpt-4o-mini, gpt-4o, or gpt-4-turbo'),
  
  body('temperature')
    .notEmpty().withMessage('Temperature is required')
    .isFloat({ min: 0, max: 1 }).withMessage('Temperature must be between 0 and 1')
    .toFloat()
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorDetails = errors.array().map(err => ({
      field: err.param,
      message: err.msg
    }));

    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        details: errorDetails,
        count: errorDetails.length
      }
    });
  }
  next();
};

module.exports = {
  validatePromptRequest,
  handleValidationErrors
};