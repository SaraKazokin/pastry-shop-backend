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
  description: Joi.string().optional(),
  price: Joi.number().min(0).required().messages({
    'number.min': 'המחיר לא יכול להיות שלילי',
    'any.required': 'מחיר הוא שדה חובה'
  }),
  ingredients: Joi.array().items(Joi.string()).optional(),
  allergens: Joi.array().items(Joi.string()).optional(),
  imageUrl: Joi.string().uri().optional(),
  isAvailable: Joi.boolean().optional()
});

export const updateProductSchema = Joi.object({
  name: Joi.string(),
  category: Joi.string(),
  description: Joi.string(),
  price: Joi.number().min(0),
  ingredients: Joi.array().items(Joi.string()),
  allergens: Joi.array().items(Joi.string()),
  imageUrl: Joi.string().uri(),
  isAvailable: Joi.boolean()
}).min(1).messages({
  'object.min': 'יש לספק לפחות שדה אחד לעדכון'
});