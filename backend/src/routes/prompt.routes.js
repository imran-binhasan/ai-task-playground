const express = require('express');
const router = express.Router();
const promptController = require('../controllers/prompt.controller');
const { validatePromptRequest, handleValidationErrors } = require('../middlewares/validation');

router.post('/generate',
  validatePromptRequest,
  handleValidationErrors,
  promptController.generatePrompt
);

router.get('/models', promptController.getModels);


module.exports = router;