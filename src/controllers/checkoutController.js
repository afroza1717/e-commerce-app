import Checkout from "../models/checkout.js";
import Cart from "../models/cart.js";


/**
 * Getting Checkout List
 * @param {*} req 
 * @param {*} res 
 */
export const getCheckoutList = async (req, res) => {
    try {
        //DOCS: https://mongoosejs.com/docs/api/query.html#Query.prototype.find()
        const checkoutList = await Checkout.find();
        console.log("Checkout List::", checkoutList);
        res.status(200).json(checkoutList);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


/**
 * Getting Checkout by Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getCheckoutById = async (req, res) => {
    try {
        // Find the Checkout using the `checkout_id` field
        const checkout_id = req.params.id;
        console.log("Checkout Req Id: ", checkout_id);

        const checkout = await Checkout.findOne({ checkout_id: req.params.id });

        console.log("Getting Checkout =>", checkout);

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        res.status(200).json(checkout);
    } catch (error) {
        console.error("Error fetching checkout:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


/**
 * Creating New Checkout
 * @param {*} req 
 * @param {*} res 
 */

export const createCheckout = async (req, res) => {
    try {
        var savedCheckout;
        const newCheckout = new Checkout(req.body);
        console.log("newCheckout checkout =>", newCheckout);

        //DOCS: https://mongoosejs.com/docs/api/document.html#Document.prototype.save()
        savedCheckout = await newCheckout.save();
        console.log("Created checkout =>", savedCheckout);

        res.status(201).json({
            message: 'Checkout Created Successfully.',
            data: savedCheckout
        })
    } catch (error) {
        res
            .status(400)
            .json({ message: "Error creating Checkout", error: error.message });
    }

}


/**
 * Updating the Checkout Accordingly with the request
 * @param {*} req 
 * @param {*} res 
 */

export const updateCheckout = async (req, res) => {
    console.log("req.params", req.params);

    try {
        //DOCS https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()
        const updatedCheckout = await Checkout.findOneAndUpdate(
            { checkout_id: req.params.id },
            req.body,
            {
                new: true, //return the modified document rather than the original
            }
        );
        if (!updatedCheckout) {
            return res.status(404).json({ message: "Checkout not found" });
        }
        res.status(200).json(updatedCheckout);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error updating Checkout", error: error.message });
    }
}

/**
 * Delete Checkout
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

export const deleteSpecificCheckout = async (req, res) => {
    console.log("req.params", req.params);
    try {
        //DOCS https://mongoosejs.com/docs/api/model.html#Model.findOneAndDelete()
        const deletedCheckout = await Checkout.findOneAndDelete({
            checkout_id: req.params.id,
        });

        if (!deletedCheckout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        res.status(200).json({ message: "Checkout deleted successfully" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error deleting Checkout", error: error.message });
    }
}

/**
 * Getting Checkout by Cart Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getCheckoutByCartId = async (req, res) => {
    try {
        // Find the Checkout using the `cart_id` field
        const cart_id = req.params.id;
        console.log("Checkout Req Id: ", cart_id);

        const checkout = await Checkout.find({ cart_id: req.params.id });

        console.log("Getting Checkout for given Cart =>", cart_id, checkout);

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        res.status(200).json(checkout);
    } catch (error) {
        console.error("Error fetching checkout:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

/**
 * Getting Checkout by User Id and Status
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getCheckoutWithUserAndStatus = async (req, res) => {
    try {
        // Find the Checkout using the `user_id` field
        const { user_id, checkout_status } = req.params;

        console.log("Checkout Req Id: ", req.params);

        const cartList = await Cart.find({ user_id: user_id });

        console.log("Getting Cart List for given User and Status =>", req.params, cartList);

        if (!cartList) {
            return res.status(404).json({ message: "Cart not found for this User" });
        }

        const cartIdList = cartList.map(cart => cart.cart_id);
        console.log("cartIdList =>", cartIdList);

        //Getting the card details list with this ids
        const checkout = await Checkout.find({
            cart_id: { $in: cartIdList },
            checkout_status: checkout_status
        });
        console.log("Getting Checkout for given User =>", checkout);

        res.status(200).json(checkout);
    } catch (error) {
        console.error("Error fetching checkout:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


/**
 * Getting Checkout by User Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getCheckoutByUserId = async (req, res) => {
    try {
        // Find the Checkout using the `user_id` field
        const user_id = req.params.id;
        console.log("Checkout Req Id: ", user_id);

        const cartList = await Cart.find({ user_id: req.params.id });

        console.log("Getting Cart List for given User =>", user_id, cartList);

        if (!cartList) {
            return res.status(404).json({ message: "Cart not found for this User" });
        }

        const cartIdList = cartList.map(cart => cart.cart_id);

        //Getting the card details list with this ids
        const checkout = await Checkout.find({ cart_id: { $in: cartIdList } });
        console.log("Getting Checkout for given User =>", user_id, checkout);

        res.status(200).json(checkout);
    } catch (error) {
        console.error("Error fetching checkout:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};