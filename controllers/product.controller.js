import Product from '../models/product.model.js';
import AppError from "../utils/AppError.js";

export const getProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();

    res.status(200).json({ data: products, total, page, limit });
};

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new AppError('Product not found', 404); return res.status(404).json({ message: 'מוצר לא נמצא' });
    }
    res.status(200).json({ product });
};

export const createProduct = async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
};

export const updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!product) {
        throw new AppError('Product not found', 404);
    }
    res.status(200).json({ message: 'Product updated successfully', product });
};

export const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        throw new AppError('Product not found', 404);
    }
    res.status(204).send();
};