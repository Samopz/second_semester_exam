import express from "express";
import {
  create,
  getAll,
  getById,
  update,
  deleteById,
} from "../controllers/blog.controller.js";
import blogValidation from "../validations/blog.validation.js";
import cacheGetAllBlogs from "../integrations/cache.js";

const router = express.Router();

// Define API Endpoints for Blog
router.post("/", blogValidation, create);
router.get("/", getAll, cacheGetAllBlogs);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", deleteById);

// Alternatively, you can use the .route() method to chain all the HTTP verbs together
// router.route('/').get(getAll).post(create);
// router.route('/:id').get(getById).put(update).delete(deleteById);

export default router;
