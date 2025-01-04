const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'LegalOps APIs',
            version: '1.0.0',
            description: 'API documentation for authentication and other features',
        },
       servers: [
            {
                url: 'http://localhost:3000', // Your server URL
            },
        ],
    },
    apis: ['./swagger-docs/*.js'], // Load all documentation files in the swagger-docs folder
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // API documentation route
}

module.exports = setupSwagger;
