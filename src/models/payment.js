import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

//Define Checkout Schema
//DOCS: https://mongoosejs.com/docs/api/schema.html#Schema()
//DOCS: https://www.npmjs.com/package/uuid
const paymentSchema = new mongoose.Schema({
    payment_id: {
        type: String,
        default: uuidv4, // Automatically generate a UUID when a new Object is created
        unique: true,
    },

    checkout_id: {
        type: String,
        ref: 'Checkout'
    },

    payment_type: {
        type: String,
        ref: 'Payment_Type',
        required: true
    },

    transaction_external_no: {
        type: String,
        required: true
    },

    bank_name: {
        type: String
    },

    total_amount: {
        type: mongoose.Decimal128
    },

    payment_status: {
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
const payment = mongoose.model("Payment", paymentSchema);

export default payment;


