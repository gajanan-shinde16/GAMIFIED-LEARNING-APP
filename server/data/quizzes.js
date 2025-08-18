export const quizzes = [
  {
    title: 'JavaScript Basics',
    description: 'Test your fundamental JS knowledge.',
    difficulty: 'Easy',
    questions: [
      {
        questionText: 'What is the output of `console.log(typeof null)`?',
        answerOptions: [
          { answerText: 'null' },
          { answerText: 'undefined' },
          { answerText: 'object' },
          { answerText: 'string' },
        ],
        correctAnswerIndex: 2,
      },
      {
        questionText: 'Which keyword is used to declare a variable that cannot be reassigned?',
        answerOptions: [
          { answerText: 'let' },
          { answerText: 'var' },
          { answerText: 'const' },
          { answerText: 'static' },
        ],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    title: 'React Fundamentals',
    description: 'How well do you know React?',
    difficulty: 'Medium',
    questions: [
      {
        questionText: 'What is JSX?',
        answerOptions: [
          { answerText: 'A JavaScript library' },
          { answerText: 'A syntax extension for JavaScript' },
          { answerText: 'A database query language' },
          { answerText: 'A styling preprocessor' },
        ],
        correctAnswerIndex: 1,
      },
      {
        questionText: 'Which hook is used to manage state in a functional component?',
        answerOptions: [
          { answerText: 'useEffect' },
          { answerText: 'useContext' },
          { answerText: 'useState' },
          { answerText: 'useReducer' },
        ],
        correctAnswerIndex: 2,
      },
    ],
  },
];
