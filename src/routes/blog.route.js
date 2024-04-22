import express from 'express';
import { create, getAll, getById, update, deleteById } from '../controllers/blog.controller.js';

const router = express.Router();

// Define API endpoint to create a new blog
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', deleteById);

export default router;
