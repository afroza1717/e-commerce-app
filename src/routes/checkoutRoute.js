import express from "express";

import {
    createCheckout, getCheckoutList, getCheckoutById, updateCheckout,
    getCheckoutByUserId, getCheckoutByCartId, getCheckoutWithUserAndStatus
} from "../controllers/checkoutController.js";

import { deleteSpecificCheckout } from "../controllers/checkoutController.js";
import { AuthGuard } from "../middleware/authMiddleware.js";


const checkoutRouter = express.Router();

checkoutRouter.get('/', AuthGuard, getCheckoutList); //List of the Checkouts

checkoutRouter.get('/:id', AuthGuard, getCheckoutById); //Get Specific Checkout by Id

checkoutRouter.post('/', AuthGuard, createCheckout); //CREATE New Checkouts

checkoutRouter.put('/:id', AuthGuard, updateCheckout);

checkoutRouter.get('/user/:id', AuthGuard, getCheckoutByUserId);

checkoutRouter.get('/userWithCheckoutStatus/:user_id/:checkout_status', AuthGuard,
    getCheckoutWithUserAndStatus); //Check Product Quantity


checkoutRouter.get('/cartId/:id', AuthGuard, getCheckoutByCartId);

checkoutRouter.delete('/:id', AuthGuard, deleteSpecificCheckout);


export default checkoutRouter;