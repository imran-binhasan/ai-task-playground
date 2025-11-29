const express = require('express');
const router = express.Router();

router.post('/generate', (req, res) => {
  const { prompt, model, temperature } = req.body;
  
  res.json({
    success: true,
    data: {
      reply: `Mock response for: "${prompt}"`,
      usedModel: model || 'gpt-3.5-turbo',
      temperature: temperature || 0.7,
      createdAt: new Date().toISOString()
    }
  });
});


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