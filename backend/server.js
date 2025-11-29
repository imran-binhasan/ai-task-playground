require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS || 'http://localhost:3000'
}));


const promptRoutes = require('./src/routes/prompt.routes');

app.get('/', (req, res) => {
  res.json({
    message: 'AI Prompt Playground API',
    version: '1.0.0',
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}\n`);
});