import express from 'express';
import { submitQuizResult } from '../controllers/userProgressController.js';
import { protect } from '../middleware/authMiddleware.js';

// Initialize the Express router
const router = express.Router();

// --- Protected Route ---

// @desc    Submit the results of a completed quiz
// @route   POST /api/progress/submit
// @access  Private
router.post('/submit', protect, submitQuizResult);


// Export the router to be used in server.js
export default router;
