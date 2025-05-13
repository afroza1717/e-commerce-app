import express from "express";

import {
    createPayment, getPaymentList, getPaymentById, updatePayment,
    getPaymentByUserId, getPaymentByCartId, getPaymentWithUserAndStatus
} from "../controllers/paymentController.js";

import { deleteSpecificPayment } from "../controllers/paymentController.js";
import { AuthGuard } from "../middleware/authMiddleware.js";


const paymentRouter = express.Router();

paymentRouter.get('/', AuthGuard, getPaymentList); //List of the Payments

paymentRouter.get('/:id', AuthGuard, getPaymentById); //Get Specific Payment by Id

paymentRouter.post('/', AuthGuard, createPayment); //CREATE New Payments

paymentRouter.put('/:id', AuthGuard, updatePayment);

paymentRouter.get('/user/:id', AuthGuard, getPaymentByUserId);

paymentRouter.get('/userWithPaymentStatus/:user_id/:payment_status', AuthGuard,
    getPaymentWithUserAndStatus); //Check Product Quantity


paymentRouter.get('/cartId/:id', AuthGuard, getPaymentByCartId);

paymentRouter.delete('/:id', AuthGuard, deleteSpecificPayment);


export default paymentRouter;