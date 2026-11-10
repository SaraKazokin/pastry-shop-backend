import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js';

import validate from '../middleware/validate.js';
import { createProductSchema, updateProductSchema } from '../validation/product.validation.js';

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(validate(createProductSchema), createProduct);

router.route('/:id')
    .get(getProductById)
    .put(validate(updateProductSchema), updateProduct)
    .delete(deleteProduct);

export default router;