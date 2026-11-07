import User from '../models/user.model.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'המשתמש לא נמצא' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'שגיאה בקבלת המשתמש או מזהה לא תקין' });
    }
};

export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json(userResponse);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'כתובת האימייל כבר קיימת במערכת' });
        }
        res.status(400).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'המשתמש לא נמצא' });
        }
        res.status(200).json(user);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'כתובת האימייל כבר קיימת במערכת' });
        }
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'המשתמש לא נמצא' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};