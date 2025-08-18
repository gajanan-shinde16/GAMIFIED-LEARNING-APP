import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../common/Spinner';

/**
 * A component to protect routes that require authentication.
 * It checks if a user is logged in. If they are, it renders the child components.
 * Otherwise, it redirects them to the login page.
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.children - The child components to render if the user is authenticated.
 */
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Show a spinner while the authentication state is being determined
    return <Spinner />;
  }

  // If there is a user, render the child components (the protected page)
  // Otherwise, redirect to the login page
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;