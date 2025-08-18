import axios from 'axios';

// The base URL for our backend API's quiz routes
const API_URL = 'http://localhost:5000/api/quizzes/';

/**
 * Fetches a list of all available quizzes from the backend.
 * This is used for the main dashboard view.
 * @returns {Array} - An array of quiz objects.
 */
const getAllQuizzes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

/**
 * Fetches a single, detailed quiz by its ID.
 * This is used when a user starts a specific quiz.
 * @param {string} quizId - The ID of the quiz to fetch.
 * @returns {object} - The full quiz object, including questions.
 */
const getQuizById = async (quizId) => {
  const response = await axios.get(API_URL + quizId);
  return response.data;
};


// Note: We will add the `submitQuiz` function to a separate `progressService.js`
// to keep concerns separated, just like on the backend.

const quizService = {
  getAllQuizzes,
  getQuizById,
};

export default quizService;
