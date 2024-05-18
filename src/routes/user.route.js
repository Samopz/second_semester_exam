import express from 'express';
import { register, login, getProfile } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import userValidation from '../validations/user.validation.js'
import loginValidation from '../validations/login.validation.js'


// app.use(authMiddleware) // This will make all the routes protected
const router = express.Router();

// Define API Endpoints for User sign up and sign in
router.post('/register', userValidation, authMiddleware, register); // Protect the register route using the authMiddleware
router.post('/login', loginValidation, authMiddleware, login); // Protect the login route using the authMiddleware
router.get('/profile', authMiddleware, getProfile); // Protect the profile route using the authMiddleware

export default router;