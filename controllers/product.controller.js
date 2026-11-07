import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit);
        const total = await Product.countDocuments();

        res.status(200).json({ data: products, total, page, limit});
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בשרת', error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'מוצר לא נמצא' });
        }
        res.status(200).json({product });
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בשרת', error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: 'מוצר נוצר בהצלחה', product });
    } catch (error) {
        res.status(400).json({ message: 'שגיאה ביצירת מוצר', error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!product) {
            return res.status(404).json({ message: 'מוצר לא נמצא' });
        }
        res.status(200).json({ message: 'מוצר עודכן בהצלחה', product });
    } catch (error) {
        res.status(400).json({ message: 'שגיאה בעדכון מוצר', error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'מוצר לא נמצא' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בשרת', error: error.message });
    }
};