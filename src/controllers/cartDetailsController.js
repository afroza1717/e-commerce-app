import CartDetails from "../models/cartDetails.js";
import Cart from "../models/cart.js";


/**
 * Getting CartDetails List
 * @param {*} req 
 * @param {*} res 
 */
export const getCartDetailsList = async (req, res) => {
    try {
        //DOCS: https://mongoosejs.com/docs/api/query.html#Query.prototype.find()
        const cartDetailsList = await CartDetails.find();
        console.log("CartDetails List::", cartDetailsList);
        res.status(200).json(cartDetailsList);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


/**
 * Getting CartDetails by Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getCartDetailsById = async (req, res) => {
    try {
        // Find the CartDetails using the `cartDetails_id` field
        const cartDetails_id = req.params.id;
        console.log("CartDetails Req Id: ", cartDetails_id);

        const cartDetails = await CartDetails.findOne({ cart_details_id: req.params.id });

        console.log("Getting CartDetails =>", cartDetails);

        if (!cartDetails) {
            return res.status(404).json({ message: "CartDetails not found" });
        }

        res.status(200).json(cartDetails);
    } catch (error) {
        console.error("Error fetching cartDetails:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


/**
 * Creating New CartDetails
 * @param {*} req 
 * @param {*} res 
 */

export const createCartDetails = async (req, res) => {
    try {
        var savedCartDetails;
        const newCartDetails = new CartDetails(req.body);
        console.log("newCartDetails cartDetails =>", newCartDetails);

        //DOCS: https://mongoosejs.com/docs/api/document.html#Document.prototype.save()
        savedCartDetails = await newCartDetails.save();
        console.log("Created cartDetails =>", savedCartDetails);

        res.status(201).json(savedCartDetails);
    } catch (error) {
        res
            .status(400)
            .json({ message: "Error creating CartDetails", error: error.message });
    }

    res.status(201).json({
        message: 'CartDetails Created Successfully.',
        data: savedCartDetails
    })
}


/**
 * Updating the CartDetails Accordingly with the request
 * @param {*} req 
 * @param {*} res 
 */

export const updateCartDetails = async (req, res) => {
    console.log("req.params", req.params);

    try {
        //DOCS https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()
        const updatedCartDetails = await CartDetails.findOneAndUpdate(
            { cart_details_id: req.params.id },
            req.body,
            {
                new: true, //return the modified document rather than the original
            }
        );
        if (!updatedCartDetails) {
            return res.status(404).json({ message: "CartDetails not found" });
        }
        res.status(200).json(updatedCartDetails);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error updating CartDetails", error: error.message });
    }
}

/**
 * Delete CartDetails
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

export const deleteSpecificCartDetails = async (req, res) => {
    console.log("req.params", req.params);
    try {
        //DOCS https://mongoosejs.com/docs/api/model.html#Model.findOneAndDelete()
        const deletedCartDetails = await CartDetails.findOneAndDelete({
            cart_details_id: req.params.id,
        });

        if (!deletedCartDetails) {
            return res.status(404).json({ message: "CartDetails not found" });
        }

        res.status(200).json({ message: "CartDetails deleted successfully" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error deleting CartDetails", error: error.message });
    }
}

/**
 * Getting CartDetails by Cart Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getCartDetailsByCartId = async (req, res) => {
    try {
        // Find the CartDetails using the `cart_id` field
        const cart_id = req.params.id;
        console.log("CartDetails Req Id: ", cart_id);

        const cartDetails = await CartDetails.find({ cart_id: req.params.id });

        console.log("Getting CartDetails for given Cart =>", cart_id, cartDetails);

        if (!cartDetails) {
            return res.status(404).json({ message: "CartDetails not found" });
        }

        res.status(200).json(cartDetails);
    } catch (error) {
        console.error("Error fetching cartDetails:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

/**
 * Getting CartDetails by User Id and Status
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getUserWithGivenStatus = async (req, res) => {
    try {
        // Find the CartDetails using the `user_id` field
        const { user_id, cart_status } = req.params;

        console.log("CartDetails Req Id: ", req.params);

        const cartList = await Cart.find({ user_id: user_id, cart_status: cart_status });

        console.log("Getting Cart List for given User and Status =>", req.params, cartList);

        if (!cartList) {
            return res.status(404).json({ message: "Cart not found for this User" });
        }

        const cartIdList = cartList.map(cart => cart.cart_id);
        console.log("cartIdList =>", cartIdList);

        //Getting the card details list with this ids
        const cartDetails = await CartDetails.find({ cart_id: { $in: cartIdList } });
        console.log("Getting CartDetails for given User =>", cartDetails);

        res.status(200).json(cartDetails);
    } catch (error) {
        console.error("Error fetching cartDetails:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


/**
 * Getting CartDetails by User Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getCartDetailsByUserId = async (req, res) => {
    try {
        // Find the CartDetails using the `user_id` field
        const user_id = req.params.id;
        console.log("CartDetails Req Id: ", user_id);

        const cartList = await Cart.find({ user_id: req.params.id });

        console.log("Getting Cart List for given User =>", user_id, cartList);

        if (!cartList) {
            return res.status(404).json({ message: "Cart not found for this User" });
        }

        const cartIdList = cartList.map(cart => cart.cart_id);

        //Getting the card details list with this ids
        const cartDetails = await CartDetails.find({ cart_id: { $in: cartIdList } });
        console.log("Getting CartDetails for given User =>", user_id, cartDetails);

        res.status(200).json(cartDetails);
    } catch (error) {
        console.error("Error fetching cartDetails:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


/**
 * Getting Cart Sub Total Cost by Cart Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getSubTotalCostByCartId = async (req, res) => {
    try {
        // Find the CartDetails using the `cart_id` field
        const cart_id = req.params.id;
        console.log("CartDetails Req Id: ", cart_id);

        const cartDetailList = await CartDetails.find({ cart_id: req.params.id });

        console.log("Getting CartDetails for given Cart =>", cart_id, cartDetailList);

        if (!cartDetailList) {
            return res.status(404).json({ message: "CartDetails not found" });
        }

        const subTotal = cartDetailList.reduce((acc, cartDetails) => {
            return acc + parseFloat(cartDetails.quantity * cartDetails.current_price);
        }, 0);

        console.log("Getting SubTotal for given Cart =>", cart_id, subTotal);

        res.status(201).json({
            message: 'Sub Total for this Cart: ',
            data: subTotal
        })
    } catch (error) {
        console.error("Error fetching Sub Total:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


/**
 * Getting Cart Total Cost with Discount by Cart Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getTotalWithDiscountByCartId = async (req, res) => {
    try {
        // Find the CartDetails using the `cart_id` field
        const cart_id = req.params.id;
        console.log("CartDetails Req Id: ", cart_id);

        const cartDetailList = await CartDetails.find({ cart_id: req.params.id });

        console.log("Getting CartDetails for given Cart =>", cart_id, cartDetailList);

        if (!cartDetailList) {
            return res.status(404).json({ message: "CartDetails not found" });
        }

        var subTotal = cartDetailList.reduce((acc, cartDetails) => {
            return acc + parseFloat(cartDetails.quantity * cartDetails.current_price);
        }, 0);
        console.log("Getting SubTotal for given Cart =>", cart_id, subTotal);

        const cart = await Cart.findOne({ cart_id: cart_id });
        const discount = cart.discount;
        const total = subTotal * (1 - discount / 100);
        console.log("Total Cost (with Discount) for given Cart =>", cart_id, total);

        res.status(201).json({
            message: 'Total Cost (discount applied if any) for this Cart: ' + discount + "%",
            data: total.toFixed(4)
        })
    } catch (error) {
        console.error("Error fetching Total:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
