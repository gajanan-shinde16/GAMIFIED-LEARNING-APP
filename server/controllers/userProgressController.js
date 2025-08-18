import asyncHandler from 'express-async-handler';
import Quiz from '../models/Quiz.js';
import User from '../models/User.js';

/**
 * @desc    Submit the results of a completed quiz
 * @route   POST /api/progress/submit
 * @access  Private
 */
const submitQuizResult = asyncHandler(async (req, res) => {
  const { quizId, answers } = req.body;

  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const alreadyCompleted = user.completedQuizzes.some(
    (q) => q.quizId.toString() === quizId
  );

  if (alreadyCompleted) {
    res.status(400);
    throw new Error('You have already completed this quiz');
  }

  let score = 0;
  quiz.questions.forEach((question, index) => {
    if (answers[index] !== undefined && question.answerOptions[answers[index]]) {
      if (question.correctAnswerIndex === answers[index]) {
        score++;
      }
    }
  });

  const totalQuestions = quiz.questions.length;
  const percentageScore = (score / totalQuestions) * 100;
  const pointsEarned = score * 10;
  user.points += pointsEarned;

  user.completedQuizzes.push({
    quizId: quizId,
    score: percentageScore,
    dateCompleted: new Date(),
  });

  const awardBadge = (badgeName) => {
    const hasBadge = user.badges.some((b) => b.badgeName === badgeName);
    if (!hasBadge) {
      user.badges.push({ badgeName });
    }
  };

  if (percentageScore === 100) awardBadge('Perfect Score!');
  if (user.completedQuizzes.length === 1) awardBadge('First Steps');
  if (user.completedQuizzes.length === 5) awardBadge('Quiz Master');

  const updatedUser = await user.save();

  res.status(200).json({
    message: 'Quiz submitted successfully!',
    score: percentageScore,
    pointsEarned: pointsEarned,
    totalPoints: updatedUser.points,
    badges: updatedUser.badges,
  });
});

// Ensure this is a named export
export { submitQuizResult };