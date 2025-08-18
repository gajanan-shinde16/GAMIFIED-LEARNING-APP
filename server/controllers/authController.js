import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // 1. Get username, email, and password from the request body
  const { username, email, password } = req.body;

  // 2. Check if a user with this email or username already exists
  const userExists = await User.findOne({ $or: [{ email }, { username }] });

  if (userExists) {
    res.status(400); // Bad Request
    throw new Error('User with this email or username already exists');
  }

  // 3. If user does not exist, create a new user document in the database
  const user = await User.create({
    username,
    email,
    password, // The password will be automatically hashed by the middleware in User.js
  });

  // 4. If user was created successfully, send back user data and a token
  if (user) {
    res.status(201).json({ // 201 Created
      _id: user._id,
      username: user.username,
      email: user.email,
      points: user.points,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


// @desc    Authenticate a user and get a token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  // 1. Get email and password from the request body
  const { email, password } = req.body;

  // 2. Find the user by email in the database
  const user = await User.findOne({ email });

  // 3. Check if user exists AND if the entered password matches the hashed password
  if (user && (await user.matchPassword(password))) {
    // 4. If credentials are correct, send back user data and a new token
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      points: user.points,
      token: generateToken(user._id),
    });
  } else {
    // 5. If credentials are incorrect, send an unauthorized error
    res.status(401); // Unauthorized
    throw new Error('Invalid email or password');
  }
});


// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // The user's data is attached to the `req` object by the `protect` middleware
  const user = req.user;

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      points: user.points,
      badges: user.badges,
      completedQuizzes: user.completedQuizzes,
    });
  } else {
    res.status(404); // Not Found
    throw new Error('User not found');
  }
});


export { registerUser, loginUser, getUserProfile };
