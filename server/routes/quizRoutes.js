import express from 'express';
import {
  getAllQuizzes,
  getQuizById,
  createQuiz,
} from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';

// Initialize the Express router
const router = express.Router();

/**
 * @route   GET /api/quizzes
 * @desc    Fetch all quizzes (without questions for brevity)
 * @access  Public
 *
 * @route   POST /api/quizzes
 * @desc    Create a new quiz (Admin/Protected)
 * @access  Private
 */
router.route('/').get(getAllQuizzes).post(protect, createQuiz);

/**
 * @route   GET /api/quizzes/:id
 * @desc    Fetch a single quiz by its ID (with questions)
 * @access  Public
 */
router.route('/:id').get(getQuizById);


// Export the router to be used in server.js
export default router;