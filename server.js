import app from "./src/index.js";
import { connect } from "./src/database/connection.js";
import winston from "winston";

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3500;

function connectWithRetry() {
    return connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('Connected to MongoDB successfully!');
        })

        .catch(err => {
            console.error('Err connecting to MongoDB', err);
            console.log('Retrying to connect to MongoDB in 5 seconds');
            setTimeout(connectWithRetry, 5000);
        });
}

connectWithRetry();

app.listen(PORT, () =>
    winston.info(`Server is running on port ${PORT}`)
);