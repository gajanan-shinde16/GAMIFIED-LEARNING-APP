import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import User from './models/User.js';
import Quiz from './models/Quiz.js';
import { quizzes } from './data/quizzes.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Quiz.deleteMany();

    // Insert the sample quizzes
    await Quiz.insertMany(quizzes);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Clear all data
    await User.deleteMany();
    await Quiz.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

// Check for command-line arguments to run the correct function
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}