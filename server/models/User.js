import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    // --- Basic User Information ---
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes whitespace from both ends
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // Stores the email in lowercase
    },
    password: {
      type: String,
      required: true,
    },
    // --- Gamification & Progress ---
    points: {
      type: Number,
      default: 0, // New users start with 0 points
    },
    badges: [
      {
        badgeName: { type: String, required: true },
        dateEarned: { type: Date, default: Date.now },
      },
    ],
    // Tracks which quizzes the user has completed
    completedQuizzes: [
      {
        quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
        score: { type: Number },
        dateCompleted: { type: Date, default: Date.now },
      },
    ],
  },
  {
    // Automatically add `createdAt` and `updatedAt` fields
    timestamps: true,
  }
);

// --- Mongoose Middleware to Hash Password ---

// This function runs BEFORE a user document is saved to the database
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  // Generate a "salt" to add to the hash for more security
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the salt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- Mongoose Method to Compare Passwords ---

// Add a custom method to the user schema to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// Create the User model from the schema
const User = mongoose.model('User', userSchema);

export default User;
