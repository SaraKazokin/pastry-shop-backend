import Joi from 'joi';

export const createOrderSchema = Joi.object({
    userId: Joi.string().hex().length(24).required().messages({
        'string.length': 'מזהה משתמש חייב להיות בפורמט תקין',
        'any.required': 'מזהה משתמש הוא שדה חובה'
    }),
    items: Joi.array().items(
        Joi.object({
            productId: Joi.string().hex().length(24).required(),
            quantity: Joi.number().integer().min(1).required(),
            priceAtPurchase: Joi.number().min(0).required(),
            specialRequests: Joi.string().allow('').optional()
        })
    ).min(1).required().messages({
        'array.min': 'ההזמנה חייבת להכיל לפחות מוצר אחד',
        'any.required': 'רשימת המוצרים היא חובה'
    }),
    totalAmount: Joi.number().min(0).required().messages({
        'number.min': 'המחיר הכולל לא יכול להיות שלילי',
        'any.required': 'מחיר כולל הוא שדה חובה'
    }),
    status: Joi.string()
        .valid('pending', 'in_preparation', 'ready_for_pickup', 'completed', 'cancelled')
        .optional(),
    fulfillmentType: Joi.string().valid('pickup', 'delivery').required(),
    deliveryAddress: Joi.string().when('fulfillmentType', {
        is: 'delivery',
        then: Joi.required().messages({
            'string.empty': 'כתובת משלוח לא יכולה להיות ריקה',
            'any.required': 'כתובת משלוח היא שדה חובה'
        }),
        otherwise: Joi.optional()
    }),
    pickupOrDeliveryDate: Joi.date().required()
});

export const updateOrderSchema = Joi.object({
    userId: Joi.string().hex().length(24),
    items: Joi.array().items(
        Joi.object({
            productId: Joi.string().hex().length(24).required(),
            quantity: Joi.number().integer().min(1).required(),
            priceAtPurchase: Joi.number().min(0).required(),
            specialRequests: Joi.string().allow('').optional()
        })
    ).min(1),
    totalAmount: Joi.number().min(0),
    status: Joi.string().valid('pending', 'in_preparation', 'ready_for_pickup', 'completed', 'cancelled'),
    fulfillmentType: Joi.string().valid('pickup', 'delivery'),
    deliveryAddress: Joi.string().when('fulfillmentType', {
        is: 'delivery',
        then: Joi.required().messages({
            'string.empty': 'כתובת משלוח לא יכולה להיות ריקה',
            'any.required': 'כתובת משלוח היא שדה חובה'
        }),
        otherwise: Joi.optional()
    }),
    pickupOrDeliveryDate: Joi.date()
}).min(1).messages({
    'object.min': 'יש לספק לפחות שדה אחד לעדכון'
});