import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js';

import validate from '../middlewares/validation.middleware.js';
import { createProductSchema, updateProductSchema } from '../schemas/product.schema.js';

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(validate(createProductSchema), createProduct);

router.route('/:id')
    .get(getProductById)
    .put(validate(updateProductSchema), updateProduct)
    .delete(deleteProduct);

export default router;