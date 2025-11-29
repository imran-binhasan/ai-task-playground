const { body, validationResult } = require('express-validator');

const validatePromptRequest = [
  body('prompt')
    .trim()
    .notEmpty().withMessage('Prompt is required')
    .isLength({ min: 3, max: 2000 }).withMessage('Prompt must be between 3 and 2000 characters'),
  
  body('model')
    .trim()
    .notEmpty().withMessage('Model is required')
    .isIn(['gpt-5-nano', 'gpt-5-mini', 'gpt-5.1'])
    .withMessage('Model must be gpt-5-nano, gpt-5-mini, or gpt-5.1'),
  
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