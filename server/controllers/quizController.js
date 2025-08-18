import asyncHandler from 'express-async-handler';
import Quiz from '../models/Quiz.js';

// @desc    Fetch all quizzes
// @route   GET /api/quizzes
// @access  Public
const getAllQuizzes = asyncHandler(async (req, res) => {
  // Fetch all quizzes from the database.
  // We use .select('-questions') to exclude the detailed questions array
  // from this list, making the initial load faster for the dashboard.
  const quizzes = await Quiz.find({}).select('-questions');

  if (quizzes) {
    res.json(quizzes);
  } else {
    res.status(404);
    throw new Error('No quizzes found');
  }
});


// @desc    Fetch a single quiz by its ID
// @route   GET /api/quizzes/:id
// @access  Public
const getQuizById = asyncHandler(async (req, res) => {
  // Find a single quiz document by its ID, which comes from the URL parameters.
  const quiz = await Quiz.findById(req.params.id);

  if (quiz) {
    // If found, return the full quiz object, including the questions.
    res.json(quiz);
  } else {
    res.status(404);
    throw new Error('Quiz not found');
  }
});


// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Private
const createQuiz = asyncHandler(async (req, res) => {
  // This is a placeholder for a future feature.
  // The logic to create a quiz from request body data would go here.
  res.status(501).json({ message: 'Not Implemented' }); // 501 Not Implemented
});


export { getAllQuizzes, getQuizById, createQuiz };
