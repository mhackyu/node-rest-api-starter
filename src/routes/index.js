const router = require('express').Router();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { app, port, isProd } = require('../config');

// Setup Swagger UI
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: app.title,
      version: app.version,
      description: app.description,
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'mhackyu',
        url: 'https://mhackyu.dev',
        email: 'mark.christian.paderes@gmail.com',
      },
    },
    servers: [
      {
        url: isProd ? `${app.domain}/api/v1` : `${app.domain}:${port}/api/v1`,
      },
    ],
  },
  apis: ['./src/controllers/*.js', './src/models/*.js'],
};

const specs = swaggerJsdoc(swaggerOptions);
const todoController = require('../controllers/todo.controller');

if (!isProd) {
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

router.use('/todos', todoController);

module.exports = router;
