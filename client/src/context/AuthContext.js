import React, {
  createContext,
  useState,
  useContext,
  useEffect
} from 'react';
import authService from '../api/authService';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Set initial loading to true
  const [error, setError] = useState(null);

  // Check for a logged-in user when the app first loads
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);


  // Function to handle user registration
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const data = await authService.register(userData);
      setUser(data);
      setLoading(false);
    } catch (err) {
      // The authService now throws a string error message
      setError(err);
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
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  // Function to handle user logout
  const logout = () => {
    authService.logout();
    setUser(null);
  };

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
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Render children only when not in the initial loading state */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook for easy access to the context
export const useAuth = () => {
  return useContext(AuthContext);
};