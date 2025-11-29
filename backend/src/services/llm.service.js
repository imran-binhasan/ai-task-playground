const { openaiClient, OPENAI_CONFIG } = require('../config/openai');

class LLMService {
  async generateResponse(prompt, model, temperature) {
    try {
      const useRealLLM = process.env.USE_REAL_LLM === 'true' && openaiClient;

      if (useRealLLM) {
        return await this._callOpenAI(prompt, model, temperature);
      } else {
        return await this._mockResponse(prompt, model, temperature);
      }
    } catch (error) {
      console.error('LLM Service Error:', error);
      
      if (process.env.USE_REAL_LLM === 'true') {
        console.log('OpenAI failed, falling back to mock');
        return await this._mockResponse(prompt, model, temperature);
      }
      
      const err = new Error('Failed to generate response');
      err.statusCode = 500;
      throw err;
    }
  }

  async _callOpenAI(prompt, model, temperature) {
    const startTime = Date.now();

    const completion = await openaiClient.chat.completions.create({
      model: model,
      messages: [{ role: 'user', content: prompt }],
      temperature: temperature,
      max_tokens: OPENAI_CONFIG.maxTokensResponse,
    });

    return {
      reply: completion.choices[0].message.content,
      usedModel: model,
      temperature: temperature,
      createdAt: new Date().toISOString(),
      metadata: {
        source: 'openai',
        responseTime: `${Date.now() - startTime}ms`,
        tokensUsed: completion.usage.total_tokens
      }
    };
  }


async _mockResponse(prompt, model, temperature) {
  // simulated LLM latency: requirement specifies that the mock should imitate a real API response delay
  const delay = 150 + Math.random() * 200;
  await new Promise(resolve => setTimeout(resolve, delay));


  let reply;
  
  if (temperature < 0.3) {
    reply = `Based on your query, here's a focused response. Low temperature (${temperature}) ensures consistent, deterministic output suitable for factual questions and precise tasks.`;
  } else if (temperature < 0.7) {
    reply = `Thank you for your question about "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}". With moderate temperature (${temperature}), this response balances consistency with natural variety, ideal for general conversation.`;
  } else {
    reply = `Interesting question! 🎨 With high temperature (${temperature}), responses become more creative and varied. "${prompt.substring(0, 40)}${prompt.length > 40 ? '...' : ''}" opens up many exciting possibilities for exploration!`;
  }

  return {
    reply: reply,
    usedModel: model,
    temperature,
    createdAt: new Date().toISOString(),
    metadata: {
      source: 'mock',
      responseTime: `${Math.round(delay)}ms`,
      note: 'Mock LLM response – enable USE_REAL_LLM=true for OpenAI'
    }
  };
}


  getAvailableModels() {
    return OPENAI_CONFIG.availableModels;
  }
}

module.exports = new LLMService();