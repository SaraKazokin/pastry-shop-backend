import Joi from 'joi';

export const createReviewSchema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    productId: Joi.string().hex().length(24).required(),
    rating: Joi.number().min(1).max(5).required().messages({
        'number.min': 'דירוג מינימלי הוא 1',
        'number.max': 'דירוג מקסימלי הוא 5',
        'any.required': 'דירוג הוא שדה חובה'
    }),
    comment: Joi.string().allow('').optional()
});

export const updateReviewSchema = Joi.object({
    rating: Joi.number().min(1).max(5),
    comment: Joi.string().allow('')
}).min(1);