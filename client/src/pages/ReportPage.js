import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/common/Spinner';

/**
 * The report page, which displays the user's quiz history, badges, and recent quiz results.
 */
const ReportPage = () => {
  const { user, loading: userLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // State from the navigation after completing a quiz
  const [results] = useState(location.state?.results);
  const [quizTitle] = useState(location.state?.quizTitle);


  useEffect(() => {
    // If the user is not logged in and we are not in a loading state, redirect to login
    if (!userLoading && !user) {
      navigate('/login');
    }
  }, [user, userLoading, navigate]);

  if (userLoading || !user) {
    return <Spinner />;
  }

  return (
    <div className="page-container report-container">
      <header className="page-header text-center">
        <h2>Your Learning Report</h2>
        <p>A summary of your progress and achievements.</p>
      </header>

      {/* Display results from the quiz that was just completed */}
      {results && (
        <section className="report-section recent-quiz-results">
          <h3>Results for: {quizTitle}</h3>
          <div className="results-summary">
            <p><strong>Score:</strong> {results.score.toFixed(2)}%</p>
            <p><strong>Points Earned:</strong> {results.pointsEarned}</p>
            <p><strong>Total Points:</strong> {results.totalPoints}</p>
          </div>
        </section>
      )}

      <div className="report-grid">
        {/* Section for Badges */}
        <div className="report-section">
          <h3>Your Badges</h3>
          {user.badges && user.badges.length > 0 ? (
            <ul className="badge-list">
              {user.badges.map((badge, index) => (
                <li key={index} className="badge-item">
                  <span className="badge-icon">🏆</span> {badge.badgeName}
                </li>
              ))}
            </ul>
          ) : (
            <p>No badges earned yet. Keep taking quizzes!</p>
          )}
        </div>

        {/* Section for Quiz History */}
        <div className="report-section">
          <h3>Quiz History</h3>
          {user.completedQuizzes && user.completedQuizzes.length > 0 ? (
            <table className="history-table">
              <thead>
                <tr>
                  <th>Quiz ID</th>
                  <th>Score</th>
                  <th>Date Completed</th>
                </tr>
              </thead>
              <tbody>
                {user.completedQuizzes.map((quiz, index) => (
                  <tr key={index}>
                    <td>{quiz.quizId}</td>
                    <td>{quiz.score.toFixed(2)}%</td>
                    <td>{new Date(quiz.dateCompleted).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>You haven't completed any quizzes yet.</p>
          )}
        </div>
      </div>
      <div className="text-center" style={{ marginTop: '2rem' }}>
        <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default ReportPage;