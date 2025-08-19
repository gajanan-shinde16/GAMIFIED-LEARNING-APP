import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/common/Spinner';

const ReportPage = () => {
  const { user, loading: userLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [results] = useState(location.state?.results);
  const [quizTitle] = useState(location.state?.quizTitle);

  useEffect(() => {
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

      {results && (
        <section className="report-section recent-quiz-results">
          <h3>Results for: {quizTitle}</h3>
          <div className="results-summary">
            <p><strong>Score:</strong> {results.score.toFixed(2)}%</p>
            <p><strong>Points Earned:</strong> {results.pointsEarned}</p>
            {results.speedBonus > 0 && <p><strong>Speed Bonus:</strong> {results.speedBonus}</p>}
            <p><strong>Total Points:</strong> {results.totalPoints}</p>
          </div>
        </section>
      )}

      <div className="report-grid">
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