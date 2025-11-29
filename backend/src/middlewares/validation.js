const { body, validationResult } = require('express-validator');

// Validation rules for prompt generation
const validatePromptRequest = [
  body('prompt')
    .trim()
    .notEmpty().withMessage('Prompt is required')
    .isLength({ min: 2, max: 2000 }).withMessage('Prompt must be between 2 and 2000 characters'),
  
  body('model')
    .trim()
    .notEmpty().withMessage('Model is required')
    .isIn(['gpt-3.5-turbo', 'gpt-4']).withMessage('Model must be gpt-3.5-turbo or gpt-4'),
  
  body('temperature')
    .notEmpty().withMessage('Temperature is required')
    .isFloat({ min: 0, max: 1 }).withMessage('Temperature must be between 0 and 1')
    .toFloat()
];


const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        details: errors.array().map(err => ({
          field: err.path,
          message: err.msg,
          value: err.value
        }))
      }
    });
  }
  
  next();
};

module.exports = {
  validatePromptRequest,
  handleValidationErrors
};