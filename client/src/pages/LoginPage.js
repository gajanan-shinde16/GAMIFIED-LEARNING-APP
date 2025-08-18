import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/common/Spinner';

/**
 * The login page component.
 * Allows existing users to sign in to their account.
 */
const LoginPage = () => {
  const { user, login, loading, error } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  // Redirect the user if they are already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      // The useEffect will handle the redirect upon successful login
    } catch (err) {
      // The error state is handled by the AuthContext, so we just log it
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="page-container form-container">
      {loading && <Spinner />}
      <h2>Log In</h2>
      <p>Sign in to your LearnSphere account</p>

      {/* Display API error messages */}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={onSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
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