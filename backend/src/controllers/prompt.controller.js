const llmService = require('../services/llm.service');

class PromptController {
  async generatePrompt(req, res, next) {
    try {
      const { prompt, model, temperature } = req.body;

      const response = await llmService.generateResponse(prompt, model, temperature);

      res.json({
        success: true,
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

  async getModels(req, res, next) {
    try {
      const models = llmService.getAvailableModels();
      
      res.json({
        success: true,
        data: { models }
      });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new PromptController();