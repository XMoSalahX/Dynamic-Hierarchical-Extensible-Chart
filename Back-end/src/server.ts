import express, { Request, Response } from "express";
import route from "./Route/route";
import { config } from "./config";
import mongoose from "mongoose";
import cors from "cors";

const app: express.Application = express();

// To Allow Front Side to Connect To our Server
app.use(cors({ origin: config.front.url }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(config.server.port, function () {
  console.log(`starting app on: ${config.server.port}`);
});

// Connection To Mongo DB
mongoose
  .connect(`${config.mongo.url}`, { dbName: config.mongo.dbName })
  .then(() => {
    console.log("MongoDB is Connnected");
  })
  .catch((err) => {
    console.log("DB Connecion Error: " + err);
  });

//Route app to route file
route(app);

export default app;
