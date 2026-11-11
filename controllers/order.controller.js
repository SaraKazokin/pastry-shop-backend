import Order from '../models/order.model.js';

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId', 'fullName email phone')
            .populate('items.productId', 'name price');

        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('userId', 'fullName email phone')
            .populate('items.productId', 'name price imageUrl');

        if (!order) {
            return res.status(404).json({ message: 'ההזמנה לא נמצאה' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בקבלת ההזמנה או מזהה לא תקין' });
    }
};

export const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
            .populate('userId', 'fullName email phone')
            .populate('items.productId', 'name price');

        if (!order) {
            return res.status(404).json({ message: 'ההזמנה לא נמצאה'});
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'ההזמנה לא נמצאה'});
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: message.error})
    }
};