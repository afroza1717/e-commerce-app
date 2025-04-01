import express from "express";
import { createProductCategory, getProductCategoryList, getProductCategoryById, updateProductCategory, 
    deleteSpecificProductCategory} from "../controllers/productCategoryController.js";
    
import { AuthGuard } from "../middleware/authMiddleware.js";


const productCategoryRouter = express.Router();

productCategoryRouter.get('/', AuthGuard, getProductCategoryList); //List of the Product Category

productCategoryRouter.get('/:id', AuthGuard, getProductCategoryById); //Get Specific Product Category by Id

productCategoryRouter.post('/', AuthGuard, createProductCategory); //CREATE New Product Category

productCategoryRouter.put('/:id', AuthGuard, updateProductCategory);

productCategoryRouter.delete('/:id', AuthGuard, deleteSpecificProductCategory);

export default productCategoryRouter;