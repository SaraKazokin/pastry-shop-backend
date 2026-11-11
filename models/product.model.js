import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'נא להזין שם מוצר'],
            trim: true
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            trim: true
        },
        price: {
            type: Number,
            required: [true, 'נא להזין מחיר'],
            min: [0, 'מחיר לא יכול להיות שלילי']
        },
        ingredients: {
            type: [String],
            default: []
        },
        allergens: {
            type: [String],
            default: []
        },
        imageUrl: {
            type: String,
            default: ''
        },
        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
