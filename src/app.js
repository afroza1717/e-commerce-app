import express from 'express';
import cors from 'cors'; //Enable Cross origin Resource Sharing
import morgan from 'morgan'; //Logging 

import AuthRouter from './routes/authRoutes.js';
import passport from 'passport'; 
import passportConfig from './config/passport.js'; 

import productRouter from './routes/productRoute.js';
import productCategoryRouter from './routes/productCategoryRouter.js';

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// Call the passportConfig function and pass the 'passport' object to it
// This sets up any authentication strategies, session handling, etc.
passportConfig(passport); 

// Initialize passport in the app to handle authentication requests
app.use(passport.initialize()); 

app.use("/api/products/", productRouter)

app.use("/api/productCategory/", productCategoryRouter)


app.use('/api/auth', AuthRouter)


export default app;
