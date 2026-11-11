import Joi from 'joi';

export const createUserSchema = Joi.object({
    fullName: Joi.string().required().messages({
        'string.empty': 'שם מלא לא יכול להיות ריק',
        'any.required': 'שם מלא הוא שדה חובה'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'יש להזין כתובת אימייל תקינה',
        'string.empty': 'אימייל לא יכול להיות ריק',
        'any.required': 'אימייל הוא שדה חובה'
    }),
    password: Joi.string().min(8).required().messages({
        'string.min': 'הסיסמה חייבת להכיל לפחות 8 תווים',
        'string.empty': 'סיסמה לא יכולה להיות ריקה',
        'any.required': 'סיסמה היא שדה חובה'
    }),
    phone: Joi.string().required().messages({
        'string.empty': 'מספר טלפון לא יכול להיות ריק',
        'any.required': 'מספר טלפון הוא שדה חובה'
    }),
    role: Joi.string().valid('customer', 'baker', 'admin').optional().messages({
        'any.only': 'התפקיד חייב להיות אחד מהבאים: customer, baker, admin'
    })
}).rename('fullname', 'fullName', { ignoreUndefined: true });

export const updateUserSchema = Joi.object({
    fullName: Joi.string(),
    email: Joi.string().email().messages({
        'string.email': 'יש להזין כתובת אימייל תקינה'
    }),
    password: Joi.string().min(8).messages({
        'string.min': 'הסיסמה חייבת להכיל לפחות 8 תווים'
    }),
    phone: Joi.string(),
    role: Joi.string().valid('customer', 'baker', 'admin')
}).rename('fullname', 'fullName', { ignoreUndefined: true }).min(1).messages({
    'object.min': 'יש לספק לפחות שדה אחד לעדכון'
});