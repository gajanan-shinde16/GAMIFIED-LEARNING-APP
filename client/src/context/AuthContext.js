import React,
{
  createContext,
  useState,
  useContext
} from 'react';
import authService from '../api/authService';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  // Get user from localStorage if it exists
  const storedUser = JSON.parse(localStorage.getItem('user'));

  // State to hold the authenticated user
  const [user, setUser] = useState(storedUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle user registration
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const data = await authService.register(userData);
      setUser(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
      throw err;
    }
  };

  // Function to handle user login
  const login = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const data = await authService.login(userData);
      setUser(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
      throw err;
    }
  };

  // Function to handle user logout
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // --- NEW FUNCTION ---
  // Function to update the user's state after an action (like completing a quiz)
  const updateUser = async () => {
    if (user?.token) {
      try {
        const profileData = await authService.getProfile(user.token);
        // Combine the new profile data with the existing token
        const updatedUserData = { ...profileData, token: user.token };
        
        setUser(updatedUserData);
        localStorage.setItem('user', JSON.stringify(updatedUserData));
      } catch (err) {
        console.error('Failed to update user profile', err);
        // Optional: handle token expiration by logging the user out
        if (err.response?.status === 401) {
          logout();
        }
      }
    }
  };


  // The value that will be available to all consuming components
  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateUser, // Add the new function to the context value
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create a custom hook for easy access to the context
export const useAuth = () => {
  return useContext(AuthContext);
};
