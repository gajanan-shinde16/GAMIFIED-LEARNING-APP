import jwt from 'jsonwebtoken';

/**
 * Generates a JSON Web Token (JWT).
 * @param {string} id - The user's unique ID from the database, which will be embedded in the token payload.
 * @returns {string} - The generated JWT, signed with the secret key.
 */
const generateToken = (id) => {
  // The `jwt.sign` method creates the token.
  // It takes three arguments:
  // 1. The payload: Data to store in the token. We're storing the user's ID.
  // 2. The secret: A secret key from our environment variables to sign the token.
  //    This ensures that only our server can create or verify tokens.
  // 3. Options: Configuration for the token, like its expiration time.
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // The token will be valid for 30 days
  });
};

export default generateToken;