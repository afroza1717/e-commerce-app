import Product from "../models/product.js";
import ProductCategory from "../models/productCategory.js";

/**
 * Getting Product List
 * @param {*} req 
 * @param {*} res 
 */

export const searchProductByName = async (req, res) => {
    try {

        //DOCS: https://mongoosejs.com/docs/api/model.html#Model.findOne()
        const productName = req.body.productName;
        console.log("Product Serach Param:", productName);

        const productList = await Product.find({ productName: { $regex: productName, $options: 'i' } });

        if (!productList) {
            return res.status(400).json({
                message: "NO Such Product"
            })
        }

        console.log("Matched Product List => ", productList);

        res.status(200).json(productList);
    } catch (error) {
        res.status(400).json({ message: "Error Searching Product", error: error.message });
    }
};

export const searchProductByNameAndPriceRange = async (req, res) => {
    try {

        //DOCS: https://mongoosejs.com/docs/api/model.html#Model.find()
        const { productName, minPrice, maxPrice } = req.body;
        console.log("Product Serach Param: ", req.body);

        const productList = await Product.find({
            $and: [
                { price: { $gt: minPrice } },
                { price: { $lt: maxPrice } },
                { productName: { $regex: productName, $options: 'i' } }
            ]
        }
        );

        if (!productList) {
            return res.status(400).json({
                message: "NO Such Product of this price range"
            })
        }

        console.log("Matched Product List => ", productList);

        res.status(200).json(productList);
    } catch (error) {
        res.status(400).json({ message: "Error Searching Product", error: error.message });
    }
};

export const searchProductByColour = async (req, res) => {
    try {

        //DOCS: https://mongoosejs.com/docs/api/model.html#Model.findOne()
        const color = req.body.color;
        console.log("Product Serach Param: ", color);

        const productList = await Product.find({ color: { $regex: color, $options: 'i' } });

        if (!productList) {
            return res.status(400).json({
                message: "NO Such Color Product"
            })
        }

        console.log("Matched Product List => ", productList);

        res.status(200).json(productList);
    } catch (error) {
        res.status(400).json({ message: "Error Searching Product", error: error.message });
    }
};


export const searchProductByCategoryName = async (req, res) => {
    try {

        //DOCS: https://mongoosejs.com/docs/api/model.html#Model.findOne()
        const categoryName = req.body.categoryName;
        console.log("Product categoryName Serach Param:", categoryName);

        const productCategoryList = await ProductCategory.find({
            productCategoryName:
                { $regex: categoryName, $options: 'i' }
        });

        if (!productCategoryList) {
            return res.status(400).json({
                message: "NO Such Product Category"
            })
        } else {

            const productCategoryId = productCategoryList[0].product_category_id;
            console.log("Matched ProductCategoryList List and id => ", productCategoryList[0],
                productCategoryId
            );

            const productList = await Product.find({ productCategory_id: productCategoryId });
            console.log("Product List by category", productCategoryId, productList);
            res.status(200).json(productList);
        }

    } catch (error) {
        res.status(400).json({ message: "Error Searching Product", error: error.message });
    }
};
