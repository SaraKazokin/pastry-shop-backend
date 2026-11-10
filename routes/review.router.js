import express from "express";
import {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
} from "../controllers/review.controller.js";

const router = express.Router();

router.route('/')
    .get(getReviews)
    .post(createReview);

router.route('/:id')
    .get(getReviewById)
    .put(updateReview)
    .delete(deleteReview);

export default router;