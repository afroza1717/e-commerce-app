import express from "express";

import {
    createPaymentType, getPaymentTypeList, getPaymentTypeById, updatePaymentType
} from "../controllers/paymentTypeController.js";

import { deleteSpecificPaymentType } from "../controllers/paymentTypeController.js";
import { AuthGuard } from "../middleware/authMiddleware.js";


const paymentTypeRouter = express.Router();

paymentTypeRouter.get('/', AuthGuard, getPaymentTypeList); //List of the PaymentTypes

paymentTypeRouter.get('/:id', AuthGuard, getPaymentTypeById); //Get Specific PaymentType by Id

paymentTypeRouter.post('/', AuthGuard, createPaymentType); //CREATE New PaymentTypes

paymentTypeRouter.put('/:id', AuthGuard, updatePaymentType);

paymentTypeRouter.delete('/:id', AuthGuard, deleteSpecificPaymentType);


export default paymentTypeRouter;