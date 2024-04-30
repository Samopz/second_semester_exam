import express from 'express';
import { register, login, getProfile } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

// app.use(authMiddleware) // This will make all the routes protected
const router = express.Router();

// Define API Endpoints for User sign up and sign in
router.post('/register', register); // This route is not protected
router.post('/login', login); // This route is not protected
router.get('/profile', authMiddleware, getProfile); // This route is protected

export default router;