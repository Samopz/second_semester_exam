import express from 'express';
import { create, getAll, getById, update, deleteById } from '../controllers/blog.controller.js';

const router = express.Router();

// Define API Endpoints for Blog
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', deleteById);

// Alternatively, you can use the .route() method to chain all the HTTP verbs together
// router.route('/').get(getAll).post(create);
// router.route('/:id').get(getById).put(update).delete(deleteById);

export default router;
