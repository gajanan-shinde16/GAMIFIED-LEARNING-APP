import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizService from '../api/quizService';
import progressService from '../api/progressService';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/common/Spinner';

const QuizPage = () => {
  const { id: quizId } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await quizService.getQuizById(quizId);
        setQuiz(data);
        setStartTime(Date.now()); // Start timer when quiz loads
      } catch (err) {
        setError('Failed to load the quiz. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleQuizSubmit = useCallback(async (finalAnswers) => {
    try {
      const timeTaken = (Date.now() - startTime) / 1000; // Time in seconds
      const results = await progressService.submitQuizResult(
        { quizId, answers: finalAnswers, timeTaken },
        user.token
      );
      await updateUser();
      navigate('/report', { state: { results, quizTitle: quiz.title } });
    } catch (err) {
      setError('There was an error submitting your quiz. Please try again.');
      console.error(err);
    }
  }, [quizId, user.token, updateUser, navigate, quiz?.title, startTime]);

  const handleAnswerSelect = (optionIndex) => {
    if (isAnswered) return;
    setSelectedAnswer(optionIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);
    setIsAnswered(true);

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsAnswered(false);

      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        handleQuizSubmit(newAnswers);
      }
    }, 1500);
  };

  const getButtonClass = (optionIndex) => {
    if (!isAnswered) {
      return selectedAnswer === optionIndex ? 'answer-btn selected' : 'answer-btn';
    }
    const correctIndex = quiz.questions[currentQuestionIndex].correctAnswerIndex;
    if (optionIndex === correctIndex) return 'answer-btn correct';
    if (optionIndex === selectedAnswer && optionIndex !== correctIndex) return 'answer-btn incorrect';
    return 'answer-btn';
  };

  if (loading) return <Spinner />;
  if (error) return <div className="page-container error-message">{error}</div>;
  if (!quiz) return null;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="page-container quiz-container">
      <h2>{quiz.title}</h2>
      <div className="quiz-card">
        <h3>Question {currentQuestionIndex + 1}/{quiz.questions.length}</h3>
        <p className="question-text">{currentQuestion.questionText}</p>
        <div className={`answer-options ${isAnswered ? 'answered' : ''}`}>
          {currentQuestion.answerOptions.map((option, index) => (
            <button
              key={index}
              className={getButtonClass(index)}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered}
            >
              {option.answerText}
            </button>
          ))}
        </div>
        <button
          onClick={handleNextQuestion}
          className="btn btn-primary"
          disabled={selectedAnswer === null || isAnswered}
        >
          {isAnswered ? 'Processing...' : 'Submit Answer'}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;