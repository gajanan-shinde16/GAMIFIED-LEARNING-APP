import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

// Initialize the Express router
const router = express.Router();

// --- Public Routes ---

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate a user and get a token
 * @access  Public
 */
router.post('/login', loginUser);


// --- Protected Route ---

/**
 * @route   GET /api/auth/profile
 * @desc    Get user profile
 * @access  Private (requires a valid token)
 */
router.get('/profile', protect, getUserProfile);


// Export the router to be used in server.js
export default router;