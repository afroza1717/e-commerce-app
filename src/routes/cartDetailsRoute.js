import express from "express";

import {
    createCartDetails, getCartDetailsList, getCartDetailsById, updateCartDetails,
    getCartDetailsByUserId, getCartDetailsByCartId, getUserWithGivenStatus, getSubTotalCostByCartId,
    getTotalWithDiscountByCartId
} from "../controllers/cartDetailsController.js";

//import {searchCartDetailsByName, searchCartDetailsByCategoryName} from "../controllers/searchController.js" 

import { deleteSpecificCartDetails } from "../controllers/cartDetailsController.js";
import { AuthGuard } from "../middleware/authMiddleware.js";


const cartDetailsRouter = express.Router();

cartDetailsRouter.get('/', AuthGuard, getCartDetailsList); //List of the CartDetailss

cartDetailsRouter.get('/:id', AuthGuard, getCartDetailsById); //Get Specific CartDetails by Id

cartDetailsRouter.post('/', AuthGuard, createCartDetails); //CREATE New CartDetailss

cartDetailsRouter.put('/:id', AuthGuard, updateCartDetails);

cartDetailsRouter.get('/user/:id', AuthGuard, getCartDetailsByUserId);

cartDetailsRouter.get('/userWithCartStatus/:user_id/:cart_status', AuthGuard, getUserWithGivenStatus); //Check Product Quantity

cartDetailsRouter.get('/cartId/:id', AuthGuard, getCartDetailsByCartId);

cartDetailsRouter.delete('/:id', AuthGuard, deleteSpecificCartDetails);

cartDetailsRouter.get('/getSubTotalByCart/:id', getSubTotalCostByCartId);

cartDetailsRouter.get('/getTotalByCartId/:id', getTotalWithDiscountByCartId);


export default cartDetailsRouter;