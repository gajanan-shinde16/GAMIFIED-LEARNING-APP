import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

// The fully functional login page component
const LoginPage = () => {
  // Get functions and state from our AuthContext
  const { user, login, loading, error } = useAuth(); // Corrected this line
  const navigate = useNavigate();

  // State to hold the form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Destructure for easier access
  const { email, password } = formData;

  // Redirect the user if they are already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Function to update state when user types
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      // The useEffect will handle the redirect
    } catch (err) {
      // The error state from the context will be updated automatically
      console.error('Login failed');
    }
  };

  return (
    <div className="page-container form-container">
      <h2>Log In</h2>
      <p>Sign in to your LearnSphere account</p>

      {/* Display error messages */}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        {/* Disable the button while loading */}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>
      <p className="form-footer">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
