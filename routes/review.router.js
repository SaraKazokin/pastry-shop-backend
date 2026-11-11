import express from "express";
import {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
} from "../controllers/review.controller.js";

import validate from '../middlewares/validation.middleware.js';
import { createReviewSchema, updateReviewSchema } from '../schemas/review.schema.js';

const router = express.Router();

router.route('/')
    .get(getReviews)
    .post(validate(createReviewSchema), createReview);

router.route('/:id')
    .get(getReviewById)
    .put(validate(updateReviewSchema), updateReview)
    .delete(deleteReview);

export default router;