// Importing required libraries and modules
import jwt from 'jsonwebtoken'; // JWT (JSON Web Token) library to sign and verify tokens
import dotenv from 'dotenv';   // dotenv library to load environment variables from a .env file
import User from '../models/user.js'; // Importing the User model to interact with the database

// Loading environment variables from the .env file
dotenv.config();

// Function to generate JWT Token
const generateToken = (user) => { 
  // Using jwt.sign() to create a token with a payload containing the user id and username
  // It is signed with a secret key from environment variables (JWT_SECRET)
  // The token expires in 1 hour (expiresIn: '1h')
  return jwt.sign(
    { id: user.user_id, username: user.username }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' } 
  );
};

// Register User - Controller function to register a new user
export const register = async (req, res) => {
  try {
    // Create a new User instance with the data received in the request body
    const user = new User(req.body);

    // Save the user to the database
    await user.save();
    
    // Send a success response with a 201 status code (User created)
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // If an error occurs, send a failure response with a 400 status code and the error message
    res.status(400).json({ error: error.message });
  }
};

// Login User - Controller function to handle user login
export const login = async (req, res) => {
  try {
    // Extracting email and password from the request body
    const { email, password } = req.body;
    
    // Find a user in the database with the provided email
    const user = await User.findOne({ email });
    
    // If no user is found or the password does not match, send an invalid credentials response
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // If login is successful, generate a JWT token for the user and send it in the response
    res.json({ token: generateToken(user) });
  } catch (error) {
    // If an error occurs, send a failure response with a 500 status code and the error message
    res.status(500).json({ error: error.message });
  }
};
