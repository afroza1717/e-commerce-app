import Product from "../models/product.js";
import mongoose from "mongoose";


/**
 * Getting Product List
 * @param {*} req 
 * @param {*} res 
 */
export const getProduct = async (req, res) => {
  try {
    //DOCS: https://mongoosejs.com/docs/api/query.html#Query.prototype.find()
    const productList = await Product.find();
    console.log("Product List::", productList);
    res.status(200).json(productList);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



/**
 * Getting Product by Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getProductById = async (req, res) => {
  try {
    // Find the product using the `product_id` field
    const product = await Product.findOne({ product_id: req.params.id });

    console.log("Get Product =>", product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


/**
 * Creating New Product
 * @param {*} req 
 * @param {*} res 
 */

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    console.log("newProduct product =>", newProduct);
    if (!newProduct.productName) {
      return res.status(400).json({
        message: 'Product Name is Required'
      })
    }

    //DOCS: https://mongoosejs.com/docs/api/document.html#Document.prototype.save()
    const savedProduct = await newProduct.save();
    console.log("Created product =>", savedProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating Product", error: error.message });
  }

  res.status(201).json({
    message: 'Product Created Successfully.',
    data: savedProduct
  })
}


/**
 * Updating the Product Accordingly with the request
 * @param {*} req 
 * @param {*} res 
 */

export const updateProduct = async (req, res) => {
  console.log("req.params", req.params);

  try {
    //DOCS https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()
    const updatedProduct = await Product.findOneAndUpdate(
      { product_id: req.params.id },
      req.body,
      {
        new: true, //return the modified document rather than the original
      }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating Product", error: error.message });
  }

}


//Delete Product
export const deleteSpecificProduct = async (req, res) => {
  console.log("req.params", req.params);
  try {
    //DOCS https://mongoosejs.com/docs/api/model.html#Model.findOneAndDelete()
    const deletedProduct = await Product.findOneAndDelete({
      product_id: req.params.id,
    });
    
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Product", error: error.message });
  }
}

export const updateProductQuantity = async (req, res) => {
  try {
    
    //DOCS: https://mongoosejs.com/docs/api/model.html#Model.findOne()
    const productId = req.params.id;
    console.log("Product Id to change Quantity:", productId); 

    const product = await Product.findOne({ product_id: productId });
    console.log("Product for update => ", product);

    const { quantity } = req.body;
    console.log("quantity", quantity);

    // Find and update the document
    const updatedProduct = await Product.findOneAndUpdate(
      { product_id: productId }, // Find Product
      { $set: { quantity: quantity } }, // Update quantity
      { new: true } // Return updated document
    );

    console.log("Updated Product:", updatedProduct);

    if (!updatedProduct) {
      return res.status(404).json({ message: "No Product found to update quantity" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const checkProductQuantity = async (req, res) => {
  try {
    
    //DOCS: https://mongoosejs.com/docs/api/model.html#Model.findOne()
    //const productId = req.params.id;

    const {id, givenQuantity} = req.params; 

    console.log("Product Id to change Quantity:", id); 
    console.log("Given Quantity:", givenQuantity); 

    const product = await Product.findOne({ product_id: id });
    console.log("Product for update => ", product);

    if (product == null) {
      return res.status(404).json({ message: "No Product Found" });
    }

    const currentQuantity = product.quantity;


    console.log("givenQuantity", givenQuantity);
    console.log("currentQuantity:", currentQuantity);

    if (currentQuantity < givenQuantity) {
      return res.status(404).json({ message: "Products Unavailable, Given quantity is greater than Total quantity" });
    } else {
      return res.status(200).json({ message: "Products Available" });
    }

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
