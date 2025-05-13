import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

//Checkout (id, cart_id, address_type[Billing, Shipping], 
//country, city, state, zipCode)


//Define Checkout Schema
//DOCS: https://mongoosejs.com/docs/api/schema.html#Schema()
//DOCS: https://www.npmjs.com/package/uuid
const checkoutSchema = new mongoose.Schema({
    checkout_id: {
        type: String,
        default: uuidv4, // Automatically generate a UUID when a new Object is created
        unique: true,
    },

    cart_id: {
        type: String,
        ref: 'Cart'
    },

    address_type: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    zip_code: {
        type: String,
        required: true
    },

    apartment: {
        type: String,
        required: true
    },

    checkout_status: {
        type: String,
        default: "in_progress"
    }
},
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                // Deletes _id and __v fields, so they will not be returned in API responses.
                delete ret._id; // Remove _id field from API responses
                delete ret.__v; // Remove __v (Mongoose version key)
            },
        },
    }

);


//Define or create collections
const checkout = mongoose.model("Checkout", checkoutSchema);

export default checkout;


