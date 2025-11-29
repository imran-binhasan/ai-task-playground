const OpenAI = require('openai');

let openaiClient = null;

if (process.env.OPENAI_API_KEY) {
  openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log('OpenAI client initialized');
} else {
  console.log('No OpenAI API key - using mock mode');
}

const OPENAI_CONFIG = {
  availableModels: [
    {
      id: 'gpt-4o-mini',
      name: 'GPT-4o Mini',
      description: 'Fast and affordable - perfect for everyday tasks',
      pricing: 'Very affordable: $0.15/$0.60 per 1M tokens',
      maxTokens: 16384,
      recommended: true,
      speed: 'Fastest'
    },
    {
      id: 'gpt-4o',
      name: 'GPT-4o',
      description: 'Most capable model for complex reasoning',
      pricing: 'Premium: $2.50/$10.00 per 1M tokens',
      maxTokens: 128000,
      recommended: true,
      speed: 'Fast'
    },
    {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      description: 'Previous generation flagship model with large context',
      pricing: 'Standard: $10.00/$30.00 per 1M tokens',
      maxTokens: 128000,
      recommended: false,
      speed: 'Moderate'
    }
  ],
  defaultModel: 'gpt-4o-mini',
  maxTokensResponse: 500
};

module.exports = {
  openaiClient,
  OPENAI_CONFIG
};