import Review from "../models/review.model.js";
import AppError from "../utils/AppError.js";

export const getReviews = async (req, res) => {
        const reviews = await Review.find()
            .populate('userId', 'fullName')
            .populate('productId', 'name');
        res.status(200).json(reviews);
};

export const getReviewById = async (req, res) => {
        const review = await Review.findById(req.params.id)
            .populate('userId', 'fullName')
            .populate('productId', 'name imageUrl');

        if (!review) {
throw new AppError('Review not found', 404);        }
        res.status(200).json(review);
};

export const createReview = async (req, res) => {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json(review);
};

export const updateReview = async (req, res) => {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
            .populate('userId', 'fullName')
            .populate('productId', 'name');

        if (!review) {
throw new AppError('Review not found', 404);        }
        res.status(200).json(review);
};

export const deleteReview = async (req, res) => {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
throw new AppError('Review not found', 404);        }
        res.status(204).send();
};
