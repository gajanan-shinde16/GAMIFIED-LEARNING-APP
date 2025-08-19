import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      points: user.points,
      level: user.level,
      dailyStreak: user.dailyStreak,
      badges: user.badges,
      completedQuizzes: user.completedQuizzes,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const today = new Date();
    const lastLogin = user.lastLogin || new Date(0);
    today.setHours(0, 0, 0, 0);
    lastLogin.setHours(0, 0, 0, 0);
    
    const diffTime = Math.abs(today - lastLogin);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      user.dailyStreak += 1;
    } else if (diffDays > 1) {
      user.dailyStreak = 1;
    }
    
    user.lastLogin = new Date();
    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      points: user.points,
      level: user.level,
      dailyStreak: user.dailyStreak,
      badges: user.badges,
      completedQuizzes: user.completedQuizzes,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      points: user.points,
      level: user.level,
      dailyStreak: user.dailyStreak,
      badges: user.badges,
      completedQuizzes: user.completedQuizzes,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { registerUser, loginUser, getUserProfile };