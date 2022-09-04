import dotenv from "dotenv";

dotenv.config();

// DotEnv Config To Get ALL Data From Our Environment
const { MONGO_USER, MONGO_PASSWORD, SERVER_PORT, DBNAME, FRONT_URL } =
  process.env;
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@chart.8q0ltvw.mongodb.net/?retryWrites=true&w=majority`;

// Export Env Variable
export const config = {
  mongo: {
    url: MONGO_URL,
    user: MONGO_USER,
    pass: MONGO_PASSWORD,
    dbName: DBNAME,
  },
  server: {
    port: SERVER_PORT,
  },
  front: {
    url: FRONT_URL,
  },
};
