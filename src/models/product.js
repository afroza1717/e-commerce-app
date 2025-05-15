import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";


//Define Product Schema
//DOCS: https://mongoosejs.com/docs/api/schema.html#Schema()
//DOCS: https://www.npmjs.com/package/uuid
const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        default: uuidv4, // Automatically generate a UUID when a new task is created
        unique: true,
    },

    productName: {
        type: String,
        required: true,
        unique: [true, 'Already exist']
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },

    productCategory_id: {
        type: String,
        ref: 'ProductCategory',
        required: true,
    },

    supplierName: {
        type: String
    },

    productType: {
        type: String,
        ref: 'ProductType'
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
const product = mongoose.model("Product", productSchema);

export default product;