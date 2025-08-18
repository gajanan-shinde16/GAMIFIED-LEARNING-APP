import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Updated path to context

// The fully functional and dynamic navigation bar component
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  // Links to show when a user is logged in
  const authLinks = (
    <ul className="nav-links">
      <li>
        <span className="nav-username">Hello, {user?.username}</span>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <button onClick={onLogout} className="nav-button-logout">
          Logout
        </button>
      </li>
    </ul>
  );

  // Links to show when no user is logged in
  const guestLinks = (
    <ul className="nav-links">
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register" className="nav-button">
          Sign Up
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          LearnSphere
        </Link>
        
        {/* Conditionally render the links based on user state */}
        {user ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

export default Navbar;
