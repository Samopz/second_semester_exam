import express from "express";
import dotenv from "dotenv";
import blogRoutes from "./routes/blog.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
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
