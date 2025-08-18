import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import quizService from '../api/quizService';

// The fully functional user dashboard component
const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State for quizzes, loading, and errors
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If no user is logged in, redirect to the login page
    if (!user) {
      navigate('/login');
      return;
    }

    // Function to fetch quizzes from the backend
    const fetchQuizzes = async () => {
      try {
        const data = await quizService.getAllQuizzes();
        setQuizzes(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load quizzes. Please try again later.');
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [user, navigate]);

  // Show a loading message while fetching data
  if (loading) {
    return <div className="page-container"><h2>Loading...</h2></div>;
  }

  // Show an error message if the API call fails
  if (error) {
    return <div className="page-container"><p className="error-message">{error}</p></div>;
  }

  return (
    <div className="page-container">
      <header className="dashboard-header">
        {/* Display the user's actual username and points */}
        <h2>Welcome, {user?.username}!</h2>
        <div className="stats-container">
          <div className="stat-card">
            <h4>Points</h4>
            <p>{user?.points || 0}</p>
          </div>
          <div className="stat-card">
            <h4>Badges</h4>
            {/* We will implement badge display later */}
            <p>0</p>
          </div>
        </div>
      </header>

      <section className="quiz-list-section">
        <h3>Choose a Quiz</h3>
        <div className="quiz-list">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <div key={quiz._id} className="quiz-card">
                <h4>{quiz.title}</h4>
                <p>{quiz.description}</p>
                <Link to={`/quiz/${quiz._id}`} className="btn btn-secondary">
                  Start Quiz
                </Link>
              </div>
            ))
          ) : (
            <p>No quizzes available at the moment.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
