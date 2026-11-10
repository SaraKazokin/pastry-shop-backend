import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'שם המוצר לא יכול להיות ריק',
    'any.required': 'שם מוצר הוא שדה חובה'
  }),
  category: Joi.string().required().messages({
    'string.empty': 'קטגוריה לא יכולה להיות ריקה',
    'any.required': 'קטגוריה היא שדה חובה'
  }),
  price: Joi.number().required().messages({
    'number.min': 'המחיר לא יכול להיות שלילי',
    'any.required': 'מחיר הוא שדה חובה'
  }),
  imageUrl: Joi.string().uri().optional()
});

export const updateProductSchema = Joi.object({
  name: Joi.string(),
  category: Joi.string(),
    price: Joi.number().min(0),
    imageUrl: Joi.string().uri()
}).min(1).messages({
    'object.min': 'יש לספק לפחות שדה אחד לעדכון'
});