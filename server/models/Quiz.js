import mongoose from 'mongoose';

// --- Sub-schema for individual questions ---
// This defines the structure for each question within a quiz.
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'Question text is required.'],
    trim: true,
  },
  // An array of possible answers for the question.
  answerOptions: [
    {
      answerText: {
        type: String,
        required: [true, 'Answer text is required.'],
      },
    },
  ],
  // The index of the correct answer in the answerOptions array.
  correctAnswerIndex: {
    type: Number,
    required: [true, 'Please specify the correct answer index.'],
    min: 0,
  },
});


// --- Main schema for the Quiz model ---
const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A title is required for the quiz.'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'A description is required.'],
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'], // Restricts the value to one of these three
      default: 'Medium',
    },
    // An array of questions, each following the questionSchema structure.
    questions: [questionSchema],
    // A reference to the user who created the quiz (optional, but good for future features)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    // Automatically add `createdAt` and `updatedAt` fields
    timestamps: true,
  }
);

// Create the Quiz model from the schema
const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;