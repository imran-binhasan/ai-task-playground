const express = require('express');
const router = express.Router();
const promptController = require('../controllers/prompt.controller');
const { validatePromptRequest, handleValidationErrors } = require('../middlewares/validation');

/**
 * @swagger
 * /api/generate:
 *   post:
 *     summary: Generate an AI response from a prompt
 *     tags: [Prompts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *               - model
 *               - temperature
 *             properties:
 *               prompt:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 2000
 *                 example: "Explain quantum computing in simple terms"
 *               model:
 *                 type: string
 *                 enum: [gpt-5-nano, gpt-5-mini, gpt-5.1]
 *                 example: "gpt-5-mini"
 *               temperature:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 1
 *                 example: 0.65
 *     responses:
 *       200:
 *         description: Successfully generated response
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/generate',
  validatePromptRequest,
  handleValidationErrors,
  promptController.generatePrompt
);

/**
 * @swagger
 * /api/models:
 *   get:
 *     summary: Get available AI models
 *     tags: [Models]
 *     responses:
 *       200:
 *         description: List of available models
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   pricing:
 *                     type: string
 *                   maxTokens:
 *                     type: integer
 *                   recommended:
 *                     type: boolean
 *                   speed:
 *                     type: string
 */
router.get('/models', promptController.getModels);


module.exports = router;