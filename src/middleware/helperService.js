
import Cart from '../models/cart.js';
import Checkout from '../models/checkout.js';

export const updateCartStatus = async (cart_id, updateFields) => {
    return await Cart.findOneAndUpdate(
        { cart_id: cart_id },
        { $set: updateFields },
        { new: true }
    );
};


export const updateCheckoutStatus = async (checkout_id, updateFields) => {
    return await Checkout.findOneAndUpdate(
        { checkout_id: checkout_id },
        { $set: updateFields },
        { new: true }
    );
};

export const getCartIdFromCheckoutId = async (checkout_id) => {
    const checkout = await Checkout.findOne({ checkout_id: checkout_id });

    if (!checkout) {
        return res.status(404).json({ message: "Checkout not found" });
    }

    return checkout.cart_id;

}