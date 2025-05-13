import Payment from "../models/payment.js";
import Cart from "../models/cart.js";
import Checkout from "../models/checkout.js";
import { getCartIdFromCheckoutId, updateCartStatus, updateCheckoutStatus } from "../middleware/helperService.js"

/**
 * Getting Payment List
 * @param {*} req 
 * @param {*} res 
 */
export const getPaymentList = async (req, res) => {
    try {
        //DOCS: https://mongoosejs.com/docs/api/query.html#Query.prototype.find()
        const paymentList = await Payment.find();
        console.log("Payment List::", paymentList);
        res.status(200).json(paymentList);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


/**
 * Getting Payment by Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getPaymentById = async (req, res) => {
    try {
        // Find the Payment using the `payment_id` field
        const payment_id = req.params.id;
        console.log("Payment Req Id: ", payment_id);

        const payment = await Payment.findOne({ payment_id: req.params.id });

        console.log("Getting Payment =>", payment);

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.status(200).json(payment);
    } catch (error) {
        console.error("Error fetching payment:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


/**
 * Creating New Payment
 * @param {*} req 
 * @param {*} res 
 */

export const createPayment = async (req, res) => {
    try {
        var savedPayment;
        const newPayment = new Payment(req.body);
        console.log("newPayment payment =>", newPayment);

        //DOCS: https://mongoosejs.com/docs/api/document.html#Document.prototype.save()
        savedPayment = await newPayment.save();
        console.log("Created payment =>", savedPayment);

        await updateCheckoutStatus(newPayment.checkout_id, { checkout_status: "completed" });

        const cart_id = await getCartIdFromCheckoutId(newPayment.checkout_id);
        await updateCartStatus(cart_id, { cart_status: "completed" });

        res.status(201).json({
            message: 'Payment Created Successfully.',
            data: savedPayment
        })
    } catch (error) {
        res
            .status(400)
            .json({ message: "Error creating Payment", error: error.message });
    }

}


/**
 * Updating the Payment Accordingly with the request
 * @param {*} req 
 * @param {*} res 
 */

export const updatePayment = async (req, res) => {
    console.log("req.params", req.params);

    try {
        //DOCS https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()
        const updatedPayment = await Payment.findOneAndUpdate(
            { payment_id: req.params.id },
            req.body,
            {
                new: true, //return the modified document rather than the original
            }
        );
        if (!updatedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json(updatedPayment);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error updating Payment", error: error.message });
    }
}

/**
 * Delete Payment
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

export const deleteSpecificPayment = async (req, res) => {
    console.log("req.params", req.params);
    try {
        //DOCS https://mongoosejs.com/docs/api/model.html#Model.findOneAndDelete()
        const deletedPayment = await Payment.findOneAndDelete({
            payment_id: req.params.id,
        });

        if (!deletedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.status(200).json({ message: "Payment deleted successfully" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error deleting Payment", error: error.message });
    }
}

/**
 * Getting Payment by Cart Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getPaymentByCartId = async (req, res) => {
    try {
        // Find the Payment using the `cart_id` field
        const cart_id = req.params.id;
        console.log("Payment Req Id: ", cart_id);

        const checkoutList = await Checkout.find({ cart_id: req.params.id });

        console.log("Getting checkoutList for given Cart =>", cart_id, checkoutList);

        if (!checkoutList) {
            return res.status(404).json({ message: "Checkout details not found" });
        }

        const checkoutIdList = checkoutList.map(checkout => checkout.cart_id);
        console.log("checkoutIdList =>", checkoutIdList);

        //Getting the card details list with this ids
        const payment = await Payment.find({
            cart_id: { $in: checkoutIdList }
        });

        res.status(200).json(payment);

    } catch (error) {
        console.error("Error fetching payment:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

/**
 * Getting Payment by Checkout Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getPaymentByCheckoutId = async (req, res) => {
    try {
        // Find the Payment using the `checkout_id` field
        const checkout_id = req.params.id;
        console.log("Payment Req Id: ", checkout_id);

        const payment = await Payment.find({ checkout_id: req.params.id });

        console.log("Getting Payment for given Cart =>", checkout_id, payment);

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.status(200).json(payment);
    } catch (error) {
        console.error("Error fetching payment:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


/**
 * Getting Payment by User Id and Status
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getPaymentWithUserAndStatus = async (req, res) => {
    try {
        // Find the Payment using the `user_id` field
        const { user_id, payment_status } = req.params;

        console.log("Payment Req Id: ", req.params);

        const cartList = await Cart.find({ user_id: user_id });

        console.log("Getting Cart List for given User and Status =>", req.params, cartList);

        if (!cartList) {
            return res.status(404).json({ message: "Cart not found for this User" });
        }

        const cartIdList = cartList.map(cart => cart.cart_id);
        console.log("cartIdList =>", cartIdList);

        const checkoutList = await Checkout.find({
            cart_id: { $in: cartIdList }
        });

        console.log("Getting checkoutList =>", checkoutList);

        if (!checkoutList) {
            return res.status(404).json({ message: "Checkout details not found" });
        }

        const checkoutIdList = checkoutList.map(checkout => checkout.checkout_id);
        console.log("checkoutIdList =>", checkoutIdList);

        //Getting the card details list with this ids
        const payment = await Payment.find({
            checkout_id: { $in: checkoutIdList },
            payment_status: payment_status
        });
        console.log("Getting Payment for given User =>", payment);

        res.status(200).json(payment);
    } catch (error) {
        console.error("Error fetching payment:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


/**
 * Getting Payment by User Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getPaymentByUserId = async (req, res) => {
    try {
        // Find the Payment using the `user_id` field
        const user_id = req.params.id;
        console.log("Payment Req Id: ", user_id);

        const cartList = await Cart.find({ user_id: req.params.id });

        console.log("Getting Cart List for given User =>", user_id, cartList);

        if (!cartList) {
            return res.status(404).json({ message: "Cart not found for this User" });
        }

        const cartIdList = cartList.map(cart => cart.cart_id);

        const checkoutList = await Checkout.find({
            cart_id: { $in: cartIdList }
        });

        console.log("Getting checkoutList =>", checkoutList);

        if (!checkoutList) {
            return res.status(404).json({ message: "Checkout details not found" });
        }

        const checkoutIdList = checkoutList.map(checkout => checkout.checkout_id);
        console.log("checkoutIdList =>", checkoutIdList);

        //Getting the card details list with this ids
        const payment = await Payment.find({ checkout_id: { $in: cartIdcheckoutIdListList } });
        console.log("Getting Payment for given User =>", user_id, payment);

        res.status(200).json(payment);
    } catch (error) {
        console.error("Error fetching payment:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

