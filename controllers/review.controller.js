import Review from "../models/review.model";

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('userId', 'fullName')
            .populate('productId', 'name');

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('userId', 'fullName')
            .populate('productId', 'name imageUrl');

        if (!review) {
            return res.status(404).json({ message: 'הביקורת לא נמצאה' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בקבלת הביקורת או מזהה לא תקין' });
    }
};

export const createReview = async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
            .populate('userId', 'fullName')
            .populate('productId', 'name');

        if (!review) {
            return res.status(404).json({ message: 'הביקורת לא נמצאה' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'הביקורת לא נמצאה' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
