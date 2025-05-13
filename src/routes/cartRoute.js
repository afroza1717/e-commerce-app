import express from "express";

import { createCart, getCartList, getCartById, updateCart } from "../controllers/cartController.js";

//import {searchCartByName, searchCartByCategoryName} from "../controllers/searchController.js" 

import { deleteSpecificCart } from "../controllers/cartController.js";
import { AuthGuard } from "../middleware/authMiddleware.js";


const cartRouter = express.Router();

cartRouter.get('/', AuthGuard, getCartList); //List of the Carts

cartRouter.get('/:id', AuthGuard, getCartById); //Get Specific Cart by Id

cartRouter.post('/', AuthGuard, createCart); //CREATE New Carts

cartRouter.put('/:id', AuthGuard, updateCart);

//cartRouter.put('/updateCartQuantity/:id', AuthGuard, updateCartQuantity);

//cartRouter.get('/checkCartQuantity/:id/:givenQuantity', AuthGuard, checkCartQuantity); //Check Cart Quantity

cartRouter.delete('/:id', AuthGuard, deleteSpecificCart);

//cartRouter.post('/searchCartByName', searchCartByName);

//cartRouter.post('/searchCartByCategoryName', searchCartByCategoryName);


export default cartRouter;