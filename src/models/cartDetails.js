import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import Cart from './cart.js';

//CartDetails (id, cart_id, product_id, current_price, quantity)


//Define Card_Details Schema
//DOCS: https://mongoosejs.com/docs/api/schema.html#Schema()
//DOCS: https://www.npmjs.com/package/uuid
const cartDetailsSchema = new mongoose.Schema({
    cart_details_id: {
        type: String,
        default: uuidv4, // Automatically generate a UUID when a new Object is created
        unique: true,
    },

    cart_id: {
        type: String,
        ref: 'Cart'
    },

    product_id: {
        type: String,
        ref: 'Product'
    },


    current_price: {
        type: Number,
        required: true
    },


    quantity: {
        type: Number,
        required: true
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
const cartDetails = mongoose.model("cartDetails", cartDetailsSchema);

export default cartDetails;


