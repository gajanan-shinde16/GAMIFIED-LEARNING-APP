import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * The main navigation bar for the application.
 * It displays different links depending on the user's authentication status.
 */
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  // Links to show when a user is logged in
  const authLinks = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <span className="nav-greeting">Hello, {user?.username}</span>
      </li>
      <li className="nav-item">
        <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
      </li>
       <li className="nav-item">
        <NavLink to="/report" className="nav-link">Report</NavLink>
      </li>
      <li className="nav-item">
        <button onClick={handleLogout} className="nav-button nav-button-logout">
          Logout
        </button>
      </li>
    </ul>
  );

  // Links to show when no user is logged in
  const guestLinks = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink to="/login" className="nav-link">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/register" className="nav-link nav-button">
          Sign Up
        </NavLink>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          LearnSphere
        </Link>
        <div className="nav-links">
          {/* Conditionally render the links based on user state */}
          {user ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;