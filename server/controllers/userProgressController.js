import asyncHandler from 'express-async-handler';
import Quiz from '../models/Quiz.js';
import User from '../models/User.js';

// @desc    Submit the results of a completed quiz
// @route   POST /api/progress/submit
// @access  Private
const submitQuizResult = asyncHandler(async (req, res) => {
  // 1. Get the quiz ID and the user's answers from the request body.
  const { quizId, answers } = req.body; // `answers` is expected to be an array of numbers (the selected indices)

  // 2. Find the quiz in the database to get the correct answers.
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  // 3. Find the currently logged-in user.
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // 4. Calculate the score.
  let score = 0;
  quiz.questions.forEach((question, index) => {
    const correctIndex = question.correctAnswerIndex;
    const userAnswerIndex = answers[index];
    if (correctIndex === userAnswerIndex) {
      score++;
    }
  });

  const totalQuestions = quiz.questions.length;
  const percentageScore = (score / totalQuestions) * 100;

  // 5. Award points based on the score.
  // (This is a simple example; you can create more complex logic).
  const pointsEarned = score * 10; // e.g., 10 points per correct answer
  user.points += pointsEarned;

  // 6. Add the completed quiz to the user's profile.
  user.completedQuizzes.push({
    quizId: quizId,
    score: percentageScore,
    dateCompleted: new Date(),
  });

  // 7. Check for and award new badges (Gamification Logic).
  // Example Badge: "Perfect Score!"
  if (percentageScore === 100) {
    const hasPerfectScoreBadge = user.badges.some(b => b.badgeName === 'Perfect Score!');
    if (!hasPerfectScoreBadge) {
      user.badges.push({ badgeName: 'Perfect Score!' });
    }
  }
  // Example Badge: "First Steps"
  if (user.completedQuizzes.length === 1) {
     user.badges.push({ badgeName: 'First Steps' });
  }


  // 8. Save the updated user document to the database.
  const updatedUser = await user.save();

  // 9. Send back a response with the results.
  res.status(200).json({
    message: 'Quiz submitted successfully!',
    score: percentageScore,
    pointsEarned: pointsEarned,
    totalPoints: updatedUser.points,
    badges: updatedUser.badges,
  });
});

export { submitQuizResult };
