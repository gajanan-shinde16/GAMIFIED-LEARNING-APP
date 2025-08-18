import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// The fully functional user engagement report component
const ReportPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If no user is logged in, redirect to the login page
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // If the user data is still loading, show a placeholder
  if (!user) {
    return <div className="page-container"><h2>Loading Report...</h2></div>;
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Your Learning Engagement Report</h2>
        <p>A summary of your progress and achievements.</p>
      </header>
      
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
                  <th>Quiz ID (Placeholder)</th>
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
    </div>
  );
};

export default ReportPage;
