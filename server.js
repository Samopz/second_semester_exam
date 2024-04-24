import app from "./src/index.js";
import { connect } from "./src/database/connection.js";
import winston from "winston";

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/BLOGGING_API";
const PORT = process.env.PORT || 3500;

connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB successfully!');
    })

    .catch(err => {
        console.error('Err connecting to MongoDB', err);
    });

app.listen(PORT, () =>
    winston.info(`Server is running on port ${PORT}`)
);