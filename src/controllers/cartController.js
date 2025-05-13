import Cart from "../models/cart.js";



/**
 * Getting Cart List
 * @param {*} req 
 * @param {*} res 
 */
export const getCartList = async (req, res) => {
  try {
    //DOCS: https://mongoosejs.com/docs/api/query.html#Query.prototype.find()
    const cartList = await Cart.find();
    console.log("Cart List::", cartList);
    res.status(200).json(cartList);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


/**
 * Getting Cart by Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getCartById = async (req, res) => {
  try {
    // Find the Cart using the `cart_id` field
    const cart_id = req.params.id;
    console.log("Cart Req Id: ", cart_id);

    const cart = await Cart.findOne({ cart_id: req.params.id });

    console.log("Getting Cart =>", cart);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


/**
 * Creating New Cart
 * @param {*} req 
 * @param {*} res 
 */

export const createCart = async (req, res) => {
  var savedCart;
  try {
    const newCart = new Cart(req.body);
    console.log("newCart cart =>", newCart);

    //DOCS: https://mongoosejs.com/docs/api/document.html#Document.prototype.save()
    savedCart = await newCart.save();
    console.log("Created cart =>", savedCart);

    res.status(201).json({
      message: 'Cart Created Successfully.',
      data: savedCart
    })
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating Cart", error: error.message });
  }
                                      
}


/**
 * Updating the Cart Accordingly with the request
 * @param {*} req 
 * @param {*} res 
 */

export const updateCart = async (req, res) => {
  console.log("req.params", req.params);

  try {
    //DOCS https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()
    const updatedCart = await Cart.findOneAndUpdate(
      { cart_id: req.params.id },
      req.body,
      {
        new: true, //return the modified document rather than the original
      }
    );
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating Cart", error: error.message });
  }

}

/**
 * Delete Cart
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

export const deleteSpecificCart = async (req, res) => {
  console.log("req.params", req.params);
  try {
    //DOCS https://mongoosejs.com/docs/api/model.html#Model.findOneAndDelete()
    const deletedCart = await Cart.findOneAndDelete({
      cart_id: req.params.id,
    });

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting Cart", error: error.message });
  }
}
