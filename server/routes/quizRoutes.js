import express from 'express';
import {
  getAllQuizzes,
  getQuizById,
  createQuiz, // We will add this controller function later
} from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';

// Initialize the Express router
const router = express.Router();

// --- Public Routes ---

// @desc    Fetch all quizzes
// @route   GET /api/quizzes
// @access  Public
router.get('/', getAllQuizzes);

// @desc    Fetch a single quiz by its ID
// @route   GET /api/quizzes/:id
// @access  Public
router.get('/:id', getQuizById);


// --- Protected Route (Example for future use) ---

// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Private (e.g., only for admins or teachers)
// For now, we will just set up the route. We'll implement the logic later.
router.post('/', protect, createQuiz);


// Export the router to be used in server.js
export default router;
