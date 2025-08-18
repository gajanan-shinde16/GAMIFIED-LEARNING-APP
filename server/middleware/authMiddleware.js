import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

/**
 * Middleware to protect routes.
 * It verifies the user's token and attaches the user's data to the request object.
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Check if the Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 2. Extract the token from the header (e.g., "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user in the database using the ID from the token's payload.
      // We exclude the password field from the returned user object.
      req.user = await User.findById(decoded.id).select('-password');

      // 5. If the user is found, proceed to the next middleware or route handler.
      next();
    } catch (error) {
      // If the token is invalid or expired, send an error response.
      console.error(error);
      res.status(401); // Unauthorized
      throw new Error('Not authorized, token failed');
    }
  }

  // If no token is found in the header, send an error response.
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
