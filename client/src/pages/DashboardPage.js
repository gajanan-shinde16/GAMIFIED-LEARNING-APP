import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import quizService from '../api/quizService';
import Spinner from '../components/common/Spinner';

/**
 * The user's main dashboard.
 * Displays user stats and a list of available quizzes.
 */
const DashboardPage = () => {
  const { user } = useAuth();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch quizzes from the backend
    const fetchQuizzes = async () => {
      try {
        const data = await quizService.getAllQuizzes();
        setQuizzes(data);
      } catch (err) {
        setError('Failed to load quizzes. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="page-container error-message">{error}</div>;
  }

  return (
    <div className="page-container dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome, {user?.username}!</h2>
        <div className="stats-container">
          <div className="stat-card">
            <h4>Points</h4>
            <p>{user?.points || 0}</p>
          </div>
          <div className="stat-card">
            <h4>Badges</h4>
            <p>{user?.badges?.length || 0}</p>
          </div>
        </div>
      </header>

      <section className="quiz-list-section">
        <h3>Choose a Quiz</h3>
        {quizzes.length > 0 ? (
          <div className="quiz-list">
            {quizzes.map((quiz) => (
              <div key={quiz._id} className="quiz-card">
                <h4>{quiz.title}</h4>
                <p>{quiz.description}</p>
                <span className={`difficulty-badge difficulty-${quiz.difficulty?.toLowerCase()}`}>
                  {quiz.difficulty}
                </span>
                <Link to={`/quiz/${quiz._id}`} className="btn btn-secondary">
                  Start Quiz
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No quizzes available at the moment. Check back soon!</p>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;