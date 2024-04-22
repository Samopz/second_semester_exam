import { logger } from '../utils/logger.js';
import { registerUser, loginUser, getUserById } from '../services/user.service.js';

export async function register(req, res) {
    try {
        const result = await registerUser(req.body);
        res.status(201).json(result);
    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: 'Error creating user' });
    }
};

export async function login(req, res) {
    try {
        const result = await loginUser(req.body);
        res.json(result);
    } catch (err) {
        logger.error(err);
        res.status(401).json({ message: err.message });
    }
};

export async function getProfile(req, res) {
    try {
        const user = await getUserById(req.user._id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};