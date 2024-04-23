import express from 'express';
import { register, login, getProfile } from '../services/user.service.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Define API Endpoints for User sign up and sign in
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);

export default router;