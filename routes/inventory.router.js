import express from "express";
import {
  getInventory,
  getInventoryItemById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem
} from "../controllers/inventory.controller.js";

const router = express.Router();

router.route('/')
    .get(getInventory)
    .post(createInventoryItem);

router.route('/:id')
    .get(getInventoryItemById)
    .put(updateInventoryItem)
    .delete(deleteInventoryItem);

export default router;