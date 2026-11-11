import express from "express";
import {
  getInventory,
  getInventoryItemById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem
} from "../controllers/inventory.controller.js";

import validate from '../middlewares/validation.middleware.js';
import { createInventorySchema, updateInventorySchema } from '../schemas/inventory.schema.js';

const router = express.Router();

router.route('/')
    .get(getInventory)
    .post(validate(createInventorySchema), createInventoryItem);

router.route('/:id')
    .get(getInventoryItemById)
    .put(validate(updateInventorySchema), updateInventoryItem)
    .delete(deleteInventoryItem);

export default router;