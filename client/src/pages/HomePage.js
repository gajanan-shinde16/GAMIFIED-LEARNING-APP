import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * The home page component for the application.
 * It serves as the main landing page for visitors.
 */
const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <header className="hero-section text-center">
        <h1>Welcome to LearnSphere</h1>
        <p className="lead">The fun and engaging way to master new skills through gamification.</p>
        {/* Show different call-to-action based on auth state */}
        {user ? (
          <Link to="/dashboard" className="btn btn-primary btn-lg">
            Go to Your Dashboard
          </Link>
        ) : (
          <Link to="/register" className="btn btn-primary btn-lg">
            Get Started for Free
          </Link>
        )}
      </header>

      <section className="features-section">
        <h2 className="text-center">Why LearnSphere?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Interactive Quizzes</h3>
            <p>Test your knowledge with quizzes that are both challenging and fun.</p>
          </div>
          <div className="feature-card">
            <h3>Earn Points & Badges</h3>
            <p>Stay motivated by earning points and unlocking new badges as you learn.</p>
          </div>
          <div className="feature-card">
            <h3>Track Your Progress</h3>
            <p>See how far you've come with detailed reports on your quiz history and achievements.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;