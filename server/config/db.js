// Import the Mongoose library
import mongoose from 'mongoose';

/**
 * Establishes a connection to the MongoDB database.
 * This is an asynchronous function because database operations can take time.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to the database using the connection string
    // from the environment variables.
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If the connection is successful, log a confirmation message to the console.
    // The `conn.connection.host` part will display the host of the connected database.
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If an error occurs during the connection attempt, log the error message.
    console.error(`Error: ${error.message}`);

    // Exit the Node.js process with a failure code (1).
    // This is important because if the app can't connect to the database,
    // it can't function correctly.
    process.exit(1);
  }
};

// Export the connectDB function using a named export
export { connectDB };
