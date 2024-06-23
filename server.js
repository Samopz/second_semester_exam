import app from "./src/index.js";
import { connect } from "./src/database/connection.js";
import winston from "winston";
import redis from "./src/integrations/redis.js";
import colors from "colors";
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
redis.connect();

function connectWithRetry() {
  return connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log(`Connected To DB ${mongoose.connection.host} `.bgYellow);

      // console.log('Connected to MongoDB successfully!');
    })

    .catch((err) => {
      console.error("Err connecting to MongoDB", err);
      console.log("Retrying to connect to MongoDB in 10 seconds");
      setTimeout(connectWithRetry, 5000);
    });
}

connectWithRetry();

app.listen(
  PORT,
  () => new winston.transports.Console(`Server is running on port ${PORT}`)
);
