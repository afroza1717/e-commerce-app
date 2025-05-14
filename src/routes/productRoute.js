import express from "express";
import {
    createProduct, getProduct, getProductById, updateProduct,
    updateProductQuantity, checkProductQuantity
} from "../controllers/productController.js";

import {
    searchProductByName, searchProductByCategoryName, searchProductByColour,
    searchProductByNameAndPriceRange
} from "../controllers/searchController.js"

import { deleteSpecificProduct } from "../controllers/productController.js";
import { AuthGuard } from "../middleware/authMiddleware.js";


const productRouter = express.Router();

productRouter.get('/', AuthGuard, getProduct); //List of the Products

productRouter.get('/:id', AuthGuard, getProductById); //Get Specific Product by Id

productRouter.post('/', AuthGuard, createProduct); //CREATE New Products

productRouter.put('/:id', AuthGuard, updateProduct);

productRouter.put('/updateProductQuantity/:id', AuthGuard, updateProductQuantity);

productRouter.get('/checkProductQuantity/:id/:givenQuantity', AuthGuard, checkProductQuantity); //Check Product Quantity

productRouter.delete('/:id', AuthGuard, deleteSpecificProduct);

productRouter.post('/searchProductByName', searchProductByName);

productRouter.post('/searchProductByColour', searchProductByColour);

productRouter.post('/searchProductByCategoryName', searchProductByCategoryName);

productRouter.post('/searchProductByColourAndPriceRange', searchProductByNameAndPriceRange);

export default productRouter;