import Order from '../models/order.model.js';
import AppError from "../utils/AppError.js";

export const getOrders = async (req, res) => {
    const orders = await Order.find()
        .populate('userId', 'fullName email phone')
        .populate('items.productId', 'name price');
    res.status(200).json(orders)
};

export const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('userId', 'fullName email phone')
        .populate('items.productId', 'name price imageUrl');

    if (!order) {
        throw new AppError('Order not found', 404);
    }
    res.status(200).json(order);
};

export const createOrder = async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
};

export const updateOrder = async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
        .populate('userId', 'fullName email phone')
        .populate('items.productId', 'name price');

    if (!order) {
        throw new AppError('Order not found', 404);
    }
    res.status(200).json(order);
};

export const deleteOrder = async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
        throw new AppError('Order not found', 404);
    }
    res.status(204).send();
};