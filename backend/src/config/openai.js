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
      id: 'gpt-5-nano',
      name: 'GPT-5 Nano',
      description: 'Fastest and most affordable - perfect for quick tasks',
      pricing: 'Ultra-cheap: $0.05/$0.40 per 1M tokens',
      maxTokens: 16384,
      recommended: true,
      speed: 'Fastest'
    },
    {
      id: 'gpt-5-mini',
      name: 'GPT-5 Mini',
      description: 'Fast and capable for well-defined tasks',
      pricing: 'Affordable: $0.25/$2.00 per 1M tokens',
      maxTokens: 32768,
      recommended: true,
      speed: 'Fast'
    },
    {
      id: 'gpt-5.1',
      name: 'GPT-5.1',
      description: 'Advanced model for coding and complex reasoning',
      pricing: 'Premium: $1.25/$10.00 per 1M tokens',
      maxTokens: 65536,
      recommended: false,
      speed: 'Moderate'
    }
  ],
  defaultModel: 'gpt-5-nano', // Most cost-effective
  maxTokensResponse: 500
};

module.exports = {
  openaiClient,
  OPENAI_CONFIG
};