// docs/swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import path from "path";

// Get the current directory name from the module URL (works in ES module scope)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the swagger options for OpenAPI specification
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes App API",
      version: "1.0.0",
      description: "A simple API to manage notes for users",
    },
    servers: [
      {
        url: "http://localhost:5000", // Adjust the URL as per your local/production setup
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // Specify where to find the API documentation files
  apis: [path.join(__dirname, "../routes/*.js")], // This includes all the route files in your routes folder
};

// Initialize swagger-jsdoc to generate the Swagger JSON documentation
const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
