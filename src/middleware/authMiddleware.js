// Import the 'passport' module to use its authentication middleware
import passport from 'passport'; 

// Create a 'AuthGuard' middleware that uses Passport to authenticate requests
// It uses the 'jwt' strategy (JSON Web Token) for authentication
// The 'session: false' option ensures that the request does not rely on sessions, which is common for stateless authentication with JWTs
export const AuthGuard = passport.authenticate('jwt', { session: false });
