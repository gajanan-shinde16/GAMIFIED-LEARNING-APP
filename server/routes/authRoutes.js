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

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', registerUser);

// @desc    Authenticate a user and get a token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', loginUser);


// --- Protected Route ---

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private (requires a valid token)
router.get('/profile', protect, getUserProfile);


// Export the router to be used in server.js
export default router;
