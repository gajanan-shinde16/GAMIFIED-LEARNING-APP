import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

// The fully functional registration page component
const RegisterPage = () => {
  // Get functions and state from our AuthContext
  const { user, register, loading, error } = useAuth();
  const navigate = useNavigate();

  // State to hold the form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '', // For password confirmation
  });
  const [message, setMessage] = useState(''); // For password mismatch message

  // Destructure for easier access
  const { username, email, password, password2 } = formData;

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
    if (password !== password2) {
      setMessage('Passwords do not match');
    } else {
      setMessage('');
      try {
        await register({ username, email, password });
        // The useEffect will handle the redirect
      } catch (err) {
        // The error state from the context will be updated automatically
        console.error('Registration failed');
      }
    }
  };

  return (
    <div className="page-container form-container">
      <h2>Create an Account</h2>
      <p>Start your learning journey with LearnSphere</p>
      
      {/* Display error or password mismatch messages */}
      {message && <p className="error-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        {/* Disable the button while loading */}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="form-footer">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
