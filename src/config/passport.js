// Import the necessary modules
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'; // JWT Strategy and Extractor for token
import dotenv from 'dotenv'; // dotenv to load environment variables
import User from '../models/user.js'; // The User model to interact with the database

// Load environment variables from a .env file
dotenv.config();

// Define the options for JWT authentication
const options = { 
  // Define how the JWT is extracted from the request, here from the Authorization header (Bearer token)
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
  // Secret key to validate the JWT, stored in environment variable
  secretOrKey: process.env.JWT_SECRET 
};

// Export the function to configure Passport with the JWT strategy
//DOCS: https://www.passportjs.org/packages/passport-jwt/
export default (passport) => { 
  // Use the JWT strategy for authentication
  passport.use( 
    new JwtStrategy(options, async (jwt_payload, done) => { 
      try { 
        // Try to find the user in the database using the user_id from the JWT payload
        const user = await User.findOne({ user_id: jwt_payload.id }); 
        // If the user is found, pass the user object to done() method
        if (user) { 
          return done(null, user); 
        } 
        // If no user is found, pass false to indicate authentication failure
        return done(null, false); 
      } catch (error) { 
        // If an error occurs during the process, pass the error to done()
        return done(error, false); 
      } 
    }) 
  ); 
};
