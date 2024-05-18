import express from "express";
import dotenv from "dotenv";
import blogRoutes from "./routes/blog.route.js";
import userRoutes from "./routes/user.route.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

dotenv.config();

const app = express();

// Defaults to in-memory store.
// You can use redis or any other store.
const limiter = rateLimit({
  windowMs: 0.5 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Adds security middleware
app.use(helmet());

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static("./src/blogging_views")); // serve static files

app.use("/blogs", blogRoutes);
app.use("/user", userRoutes);

// import/catch all routes
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
