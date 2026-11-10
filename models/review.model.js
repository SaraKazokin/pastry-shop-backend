import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'נא לספק מזהה משתמש']
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'נא לספק מזהה מוצר']
        },
        rating: {
            type: Number,
            required: [true, 'נא לספק דירוג'],
            min: [1, 'דירוג חייב להיות בין 1 ל-5'],
            max: [5, 'דירוג חייב להיות בין 1 ל-5']
        },
        comment: {
            type: String,
            trim: true,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;