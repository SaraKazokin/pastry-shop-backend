import Inventory from "../models/inventory.model.js";
import AppError from "../utils/AppError.js";

export const getInventory = async (req, res) => {
    const inventoryItems = await Inventory.find();
    res.status(200).json(inventoryItems);
};

export const getInventoryItemById = async (req, res) => {
    const item = await Inventory.findById(req.params.id);
    if (!item) {
        throw new AppError('Inventory item not found', 404);
    }
    res.status(200).json(item);
};

export const createInventoryItem = async (req, res) => {
    const item = new Inventory(req.body);
    await item.save();
    res.status(201).json(item);
};

export const updateInventoryItem = async (req, res) => {
    const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!item) {
        throw new AppError('Inventory item not found', 404);
    }
    res.status(200).json(item);
};

export const deleteInventoryItem = async (req, res) => {
    const item = await Inventory.findByIdAndDelete(req.params.id);
    if (!item) {
        throw new AppError('Inventory item not found', 404);
    }
    res.status(204).send();
};
