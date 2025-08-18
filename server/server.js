// Import necessary packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import colors from 'colors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Import route files
import authRoutes from './routes/authRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import userProgressRoutes from './routes/userProgressRoutes.js';

// --- Initial Configuration ---

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Initialize the Express application
const app = express();

// --- Middleware ---

// Enable Cross-Origin Resource Sharing (CORS)
// This allows your React frontend to make requests to this backend
app.use(cors());

// Enable the Express app to parse JSON formatted request bodies
app.use(express.json());

// Enable the Express app to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));


// --- API Routes ---

// A simple root route to check if the server is running
app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

// Mount the imported routes
// All routes in authRoutes will be prefixed with /api/auth
app.use('/api/auth', authRoutes);
// All routes in quizRoutes will be prefixed with /api/quizzes
app.use('/api/quizzes', quizRoutes);
// All routes in userProgressRoutes will be prefixed with /api/progress
app.use('/api/progress', userProgressRoutes);


// --- Error Handling Middleware ---
// These must be the last pieces of middleware loaded

// Handle 404 Not Found errors
app.use(notFound);
// Handle all other errors with a custom error handler
app.use(errorHandler);


// --- Server Initialization ---

// Get the port from environment variables, with a default of 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});