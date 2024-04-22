import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../database/schema/user.schema.js';
import { logger } from '../utils/logger.js';

export async function registerUser(userData) {
    const { password, ...otherData } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ ...otherData, password: hashedPassword });
    await user.save();
    logger.info("User created successfully");
    return { message: 'User created' };
};

export async function loginUser({ email, password }) {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        logger.info('User logged in successfully');
        res.json ({ token });
    } else {
        logger.warn('Invalid credentials');
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

export async function getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};