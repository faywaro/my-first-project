import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export function setupSwagger(app: Express) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Todo App API",
        version: "1.0.0",
        description: "API документация",
      },
      servers: [
        { url: "http://localhost:3000" } 
        // { url: "http://185.17.3.128:3000" }
      ],
    },
    apis: ["./src/todo.routers.ts/*.ts"], 
  };

  const specs = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
