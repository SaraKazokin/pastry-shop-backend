import express from 'express';
import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} from '../controllers/order.controller.js';

import validate from '../middlewares/validation.middleware.js';
import { createOrderSchema, updateOrderSchema } from '../schemas/order.schema.js';

const router = express.Router();

router.route('/')
    .get(getOrders)
    .post(validate(createOrderSchema), createOrder);

router.route('/:id')
    .get(getOrderById)
    .put(validate(updateOrderSchema), updateOrder)
    .delete(deleteOrder);

export default router;