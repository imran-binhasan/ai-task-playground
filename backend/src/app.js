const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const errorHandler = require('./middlewares/errorHandler');
const promptRoutes = require('./routes/prompt.routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'AI Prompt Playground API'
}));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'AI Prompt Playground API',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      generate: 'POST /api/generate',
      models: 'GET /api/models',
    }
  });
});

app.use('/api', promptRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route ${req.originalUrl} not found`,
      status: 404
    }
  });
});

app.use(errorHandler);

module.exports = app;