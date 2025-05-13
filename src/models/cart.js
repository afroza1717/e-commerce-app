import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";


//Cart (id,  user_id, purchase_date, discount)


//Define Cart Schema
//DOCS: https://mongoosejs.com/docs/api/schema.html#Schema()
//DOCS: https://www.npmjs.com/package/uuid
const cartSchema = new mongoose.Schema({
    cart_id: {
        type: String,
        default: uuidv4, // Automatically generate a UUID when a new task is created
        unique: true,
    },

    user_id: {
        type: String,
        ref: 'User',
        required: true
    },

    purchase_date: {
        type: Date,
        required: true
    },

    discount: {
        type: mongoose.Decimal128

    },

    cart_status: {
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
const cart = mongoose.model("Cart", cartSchema);

export default cart;