import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerJsDocs = YAML.load("./documentation/api_swagger_endpoints.yaml");

const swaggerDocs = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDocs));
};

export default swaggerDocs;
