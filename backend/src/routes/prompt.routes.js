const express = require('express');
const router = express.Router();
const { validatePromptRequest, handleValidationErrors } = require('../middlewares/validation');

router.post('/generate',
  validatePromptRequest,
  handleValidationErrors,
  (req, res) => {
    const { prompt, model, temperature } = req.body;
    
    res.json({
      success: true,
      data: {
        reply: `Mock response for: "${prompt}"`,
        usedModel: model,
        temperature: temperature,
        createdAt: new Date().toISOString()
      }
    });
  }
);

router.get('/models', (req, res) => {
  res.json({
    success: true,
    data: {
      models: [
        { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and efficient' },
        { id: 'gpt-4', name: 'GPT-4', description: 'More capable reasoning' }
      ]
    }
  });
});

module.exports = router;