const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Automatically generated API documentation',
    },
    host: 'localhost:3000/api',
    schemes: ['http'],
    securityDefinitions: {
        BearerAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'Enter your JWT token in the format: Bearer <token>',
        },
    },
    security: [{ BearerAuth: [] }], // Apply security globally
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/authRoutes.js', './routes/sessionRoutes.js']; 

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    console.log('✅ Swagger JSON generated successfully!');
});
