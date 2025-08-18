import axios from 'axios';

// The base URL for our backend API's auth routes
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth/';

/**
 * Registers a new user by making a POST request to the backend.
 * @param {object} userData - The user's registration data (username, email, password).
 * @returns {object} - The response data from the server, including user info and token.
 */
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'register', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'A registration error occurred.';
  }
};

/**
 * Logs in a user by making a POST request to the backend.
 * @param {object} userData - The user's login data (email, password).
 * @returns {object} - The response data from the server, including user info and token.
 */
const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'login', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'An error occurred during login.';
  }
};

/**
 * Logs out the user by removing their data from local storage.
 */
const logout = () => {
  localStorage.removeItem('user');
};

/**
 * Fetches the current user's profile data from a protected route.
 * @param {string} token - The user's JWT for authorization.
 * @returns {object} - The user's profile data.
 */
const getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(API_URL + 'profile', config);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Could not fetch profile.';
  }
};


// Export the functions to be used in other parts of the application
const authService = {
  register,
  login,
  logout,
  getProfile,
};

export default authService;