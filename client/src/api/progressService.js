import axios from 'axios';

// The base URL for our backend API's progress routes
const API_URL = 'http://localhost:5000/api/progress/';

/**
 * Submits the results of a completed quiz to the backend.
 * This is a protected route and requires an authentication token.
 * @param {object} submissionData - The data to submit, including quizId and answers.
 * @param {string} token - The user's JWT token for authorization.
 * @returns {object} - The response data from the server, including score and points earned.
 */
const submitQuizResult = async (submissionData, token) => {
  // Set up the authorization headers for the protected route.
  // The backend's `protect` middleware will look for this 'Bearer' token.
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Make the POST request to the backend with the submission data and the auth config.
  const response = await axios.post(API_URL + 'submit', submissionData, config);

  return response.data;
};


const progressService = {
  submitQuizResult,
};

export default progressService;
