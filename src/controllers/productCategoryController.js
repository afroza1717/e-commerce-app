import ProductCategory from "../models/productCategory.js";

/**
 * Getting ProductCategory List
 * @param {*} req 
 * @param {*} res 
 */
export const getProductCategoryList = async (req, res) => {
  try {

    //DOCS: https://mongoosejs.com/docs/api/query.html#Query.prototype.find()
    const productCategoryList = await ProductCategory.find();
    console.log("ProductCategory List::", productCategoryList);
    res.status(200).json(productCategoryList);

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

/**
 * Getting ProductCategory by Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getProductCategoryById = async (req, res) => {
  try {
    // Find the productCategory using the `product_category_id` field
    const productCategory = await ProductCategory.findOne({ product_category_id: req.params.id });

    console.log("Get ProductCategory =>", productCategory);

    if (!productCategory) {
      return res.status(404).json({ message: "ProductCategory not found" });
    }

    res.status(200).json(productCategory);
  } catch (error) {
    console.error("Error fetching productCategory:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


/**
 * Creating New ProductCategory
 * @param {*} req 
 * @param {*} res 
 */

export const createProductCategory = async (req, res) => {
  try {
    const newProductCategory = new ProductCategory(req.body);
    console.log("newProductCategory productCategory =>", newProductCategory);
    if (!newProductCategory.productCategoryName) {
      return res.status(400).json({
        message: 'ProductCategory Name is Required'
      })
    }

    //DOCS: https://mongoosejs.com/docs/api/document.html#Document.prototype.save()
    const savedProductCategory = await newProductCategory.save();
    console.log("Created productCategory =>", savedProductCategory);

    res.status(201).json({
      message: 'ProductCategory Created Successfully.',
      data: savedProductCategory
    })
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating ProductCategory", error: error.message });
  }

}


/**
 * Updating the ProductCategory Accordingly with the request
 * @param {*} req 
 * @param {*} res 
 */

export const updateProductCategory = async (req, res) => {
  console.log("req.params", req.params);

  try {
    //DOCS https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()
    const updatedProductCategory = await ProductCategory.findOneAndUpdate(
      { product_category_id: req.params.id },
      req.body,
      {
        new: true, //return the modified document rather than the original
      }
    );
    if (!updatedProductCategory) {
      return res.status(404).json({ message: "ProductCategory not found" });
    }
    res.status(200).json(updatedProductCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating ProductCategory", error: error.message });
  }

}

/**
 * Delete ProductCategory
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

export const deleteSpecificProductCategory = async (req, res) => {
  console.log("req.params", req.params);
  try {
    //DOCS https://mongoosejs.com/docs/api/model.html#Model.findOneAndDelete()
    const deletedProductCategory = await ProductCategory.findOneAndDelete({
      product_category_id: req.params.id,
    });

    if (!deletedProductCategory) {
      return res.status(404).json({ message: "ProductCategory not found" });
    }

    res.status(200).json({ message: "ProductCategory deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting ProductCategory", error: error.message });
  }
}
