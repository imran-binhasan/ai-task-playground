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
 *                 minLength: 2
 *                 maxLength: 2000
 *                 example: "Explain quantum computing in simple terms"
 *               model:
 *                 type: string
 *                 enum: [gpt-4o-mini, gpt-4o, gpt-4-turbo]
 *                 example: "gpt-4o-mini"
 *               temperature:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 1
 *                 example: 0.7
 *     responses:
 *       200:
 *         description: Successfully generated response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     reply:
 *                       type: string
 *                       example: "Quantum computing is..."
 *                     usedModel:
 *                       type: string
 *                       example: "gpt-4o-mini"
 *                     temperature:
 *                       type: number
 *                       example: 0.7
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T10:30:00.000Z"
 *                     metadata:
 *                       type: object
 *                       properties:
 *                         source:
 *                           type: string
 *                           enum: [openai, mock]
 *                           example: "openai"
 *                         responseTime:
 *                           type: string
 *                           example: "342ms"
 *                         tokensUsed:
 *                           type: integer
 *                           example: 150
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Validation failed"
 *                     details:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           field:
 *                             type: string
 *                             example: "prompt"
 *                           message:
 *                             type: string
 *                             example: "Prompt must be at least 2 characters"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Failed to generate response"
 *                     status:
 *                       type: integer
 *                       example: 500
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
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     models:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "gpt-4o-mini"
 *                           name:
 *                             type: string
 *                             example: "GPT-4o Mini"
 *                           description:
 *                             type: string
 *                             example: "Fast and affordable - perfect for everyday tasks"
 *                           pricing:
 *                             type: string
 *                             example: "Very affordable: $0.15/$0.60 per 1M tokens"
 *                           maxTokens:
 *                             type: integer
 *                             example: 16384
 *                           recommended:
 *                             type: boolean
 *                             example: true
 *                           speed:
 *                             type: string
 *                             example: "Fastest"
 *       500:
 *         description: Server error
 */
router.get('/models', promptController.getModels);

module.exports = router;