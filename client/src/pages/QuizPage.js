import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById, submitQuiz } from '../api/quizService';
import { useAuth } from '../context/AuthContext'; // To update user profile

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateUser } = useAuth(); // Get the updateUser function

  // State variables
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // New state for immediate feedback
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track the selected option index
  const [isAnswered, setIsAnswered] = useState(false); // Track if the user has submitted an answer for the current question

  // Fetch the quiz data when the component mounts
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const data = await getQuizById(id);
        setQuiz(data);
        setError('');
      } catch (err) {
        setError('Failed to load the quiz. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  // Handle selecting an answer
  const handleAnswerSelect = (optionIndex) => {
    // Prevent changing the answer after it has been submitted and feedback is shown
    if (isAnswered) return;
    setSelectedAnswer(optionIndex);
  };

  // Handle moving to the next question or finishing the quiz
  const handleNextQuestion = () => {
    // First, record the selected answer
    setUserAnswers([
      ...userAnswers,
      {
        questionId: quiz.questions[currentQuestionIndex]._id,
        answer: selectedAnswer,
      },
    ]);

    // Show feedback
    setIsAnswered(true);

    // Wait for a moment before moving to the next question
    setTimeout(() => {
      // Reset for the next question
      setSelectedAnswer(null);
      setIsAnswered(false);

      // Move to the next question
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // If it's the last question, submit the quiz automatically
        handleQuizSubmit();
      }
    }, 1500); // 1.5-second delay to show feedback
  };

  // Handle the final submission of the quiz
  const handleQuizSubmit = async () => {
    // This function is now called automatically after the last question
    try {
      const results = await submitQuiz(id, userAnswers);
      await updateUser(); // Fetch latest user profile to update points/badges
      navigate('/report', { state: { results, quizTitle: quiz.title } });
    } catch (err) {
      setError('There was an error submitting your quiz.');
      console.error(err);
    }
  };

  // Helper function to determine the class for an answer button
  const getButtonClass = (optionIndex) => {
    if (!isAnswered) {
      return selectedAnswer === optionIndex ? 'option-btn selected' : 'option-btn';
    }

    const correctIndex = quiz.questions[currentQuestionIndex].correctAnswer;
    if (optionIndex === correctIndex) {
      return 'option-btn correct'; // Always show the correct answer in green
    }
    if (optionIndex === selectedAnswer && optionIndex !== correctIndex) {
      return 'option-btn incorrect'; // If this is the wrong answer the user picked, show it in red
    }
    return 'option-btn'; // Default for other unselected options
  };


  if (loading) return <div className="container"><p>Loading Quiz...</p></div>;
  if (error) return <div className="container"><p className="error-message">{error}</p></div>;
  if (!quiz) return null;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="container quiz-container">
      <h2>{quiz.title}</h2>
      <div className="quiz-card">
        <h3>Question {currentQuestionIndex + 1}/{quiz.questions.length}</h3>
        <p className="question-text">{currentQuestion.questionText}</p>
        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={getButtonClass(index)}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered} // Disable buttons after answering
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={handleNextQuestion}
          className="btn btn-primary"
          disabled={selectedAnswer === null || isAnswered} // Disable if no answer is selected or if feedback is being shown
        >
          {isAnswered ? 'Next' : 'Submit Answer'}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;