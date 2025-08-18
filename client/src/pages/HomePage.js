import React from 'react';
import { Link } from 'react-router-dom';

// A simple placeholder component for the home page
const HomePage = () => {
  return (
    <div className="page-container">
      <header className="hero-section">
        <h1>Welcome to LearnSphere</h1>
        <p>The fun and engaging way to master new skills.</p>
        <Link to="/register" className="btn btn-primary">
          Get Started for Free
        </Link>
      </header>
    </div>
  );
};

export default HomePage;
