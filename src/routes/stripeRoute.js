import express from "express";

import {
    getCheckoutSessionStripe
} from "../controllers/stripeController.js";

import { AuthGuard } from "../middleware/authMiddleware.js";


const stripeRouter = express.Router();

// stripeRouter.get('/', AuthGuard, getPaymentTypeList); //List of the Stripe

// stripeRouter.get('/:id', AuthGuard, getPaymentTypeById); //Get Specific Stripe by Id

stripeRouter.post('/', AuthGuard, getCheckoutSessionStripe); //CREATE New Stripe

// stripeRouter.put('/:id', AuthGuard, updatePaymentType);

// stripeRouter.delete('/:id', AuthGuard, deleteSpecificPaymentType);


export default stripeRouter;