import axios from 'axios';

// The base URL for our backend API's quiz routes
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/quizzes/';

/**
 * Fetches a list of all available quizzes from the backend.
 * This is used for the main dashboard view.
 * @returns {Promise<Array>} - An array of quiz objects.
 */
const getAllQuizzes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    // Throw a more specific error message
    throw new Error(error.response?.data?.message || 'Could not fetch quizzes.');
  }
};

/**
 * Fetches a single, detailed quiz by its ID.
 * This is used when a user starts a specific quiz.
 * @param {string} quizId - The ID of the quiz to fetch.
 * @returns {Promise<object>} - The full quiz object, including questions.
 */
const getQuizById = async (quizId) => {
  try {
    const response = await axios.get(API_URL + quizId);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Could not fetch the quiz.');
  }
};


// Note: We will add the `submitQuiz` function to a separate `progressService.js`
// to keep concerns separated, just like on the backend.

const quizService = {
  getAllQuizzes,
  getQuizById,
};

export default quizService;