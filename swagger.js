const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Lawsite API',
    description: 'API documentation for Lawsite project',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Paste your JWT token here (no need to type Bearer)',
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
