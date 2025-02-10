const fs = require('fs');
const path = require('path');

const swaggerJsonPath = path.join(__dirname, 'swagger.json');

// Define Swagger Basic Structure
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'My API Documentation',
        version: '1.0.0',
        description: 'API documentation for our project'
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
            description: 'Local server'
        }
    ],
    paths: {} // Will be filled dynamically
};

// Load Routes and Generate Paths
const loadRoutes = (dir) => {
    const routesPath = path.join(__dirname, dir);
    const routeFiles = fs.readdirSync(routesPath);

    routeFiles.forEach(file => {
        const filePath = path.join(routesPath, file);
        if (file.endsWith('.js')) {
            const route = require(filePath);
            if (typeof route.stack !== 'undefined') {
                route.stack.forEach(layer => {
                    if (layer.route) {
                        const { path, methods } = layer.route;
                        if (!swaggerDefinition.paths[path]) {
                            swaggerDefinition.paths[path] = {};
                        }
                        Object.keys(methods).forEach(method => {
                            swaggerDefinition.paths[path][method] = {
                                summary: `Endpoint for ${method.toUpperCase()} ${path}`,
                                responses: {
                                    200: {
                                        description: 'Success'
                                    }
                                }
                            };
                        });
                    }
                });
            }
        }
    });
};

// Scan `routes/` folder
loadRoutes('routes');

// Write to swagger.json
fs.writeFileSync(swaggerJsonPath, JSON.stringify(swaggerDefinition, null, 2));

console.log('✅ Swagger JSON generated successfully!');
