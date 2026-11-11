import Joi from 'joi';

export const createInventorySchema = Joi.object({
    itemName: Joi.string().required().messages({
        'string.empty': 'שם חומר הגלם לא יכול להיות ריק',
        'any.required': 'שם חומר הגלם הוא שדה חובה'
    }),
    quantity: Joi.number().min(0).required().messages({
        'number.min': 'כמות לא יכולה להיות שלילית',
        'any.required': 'כמות היא שדה חובה'
    }),
    unit: Joi.string().required().messages({
        'string.empty': 'יחידת מידה לא יכולה להיות ריקה',
        'any.required': 'יחידת מידה היא שדה חובה'
    }),
    minThreshold: Joi.number().min(0).default(0),
    lastRestocked: Joi.date().optional()
});

export const updateInventorySchema = Joi.object({
    itemName: Joi.string(),
    quantity: Joi.number().min(0),
    unit: Joi.string(),
    minThreshold: Joi.number().min(0),
    lastRestocked: Joi.date()
}).min(1);