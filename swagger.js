// swagger.js
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'LegalOps APIs',
    description: 'Auto-generated OpenAPI docs via swagger-autogen.',
    version: '1.0.0',
  },
  servers: [
    // Your app mounts all routes under /api in app.js
    { url: '/api' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {           // Authorization: Bearer <token>
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }], // apply JWT globally (UI has Authorize button)
  tags: [
    { name: 'Auth', description: 'Authentication endpoints' },
    { name: 'Session', description: 'Session CRUD & resume' },
    { name: 'LinkDoc', description: 'Linked documents' },
    { name: 'Combined', description: 'Combined session data' },
    { name: 'Docs', description: 'Document generation' },
  ],
};

const outputFile = './swagger.json';

// Include app.js (prefix /api) and all route files.
// swagger-autogen does static analysis, so list the files where routes are defined.
/*const endpointsFiles = [
  './app.js',
  './routes/authRoutes.js',
  './routes/sessionRoutes.js',
  './routes/linkdocRoutes.js',
  './routes/combinedRoutes.js',
  './routes/DocxtemplatorRoutes.js',
];*/
const endpointsFiles = ['./app.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);
