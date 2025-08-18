import express from 'express';
// Ensure this is a named import
import { submitQuizResult } from '../controllers/userProgressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   POST /api/progress/submit
 * @desc    Submit the results of a completed quiz and update user progress
 * @access  Private
 */
router.route('/submit').post(protect, submitQuizResult);

export default router;