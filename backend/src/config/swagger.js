const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Prompt Playground API',
      version: '1.0.0',
      description: 'RESTful API for AI prompt generation using OpenAI models',
      contact: {
        name: 'API Support'
      }
    }
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsDoc(swaggerOptions);