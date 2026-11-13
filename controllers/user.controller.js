import User from '../models/user.model.js';
import AppError from "../utils/AppError.js";

export const getUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.status(200).json(users);
};

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
        throw new AppError('User not found', 404);
    }
    res.status(200).json(user);
};

export const createUser = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(201).json(userResponse);
};

export const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).select('-password');

    if (!user) {
        throw new AppError('User not found', 404);
    }
    res.status(200).json(user);
};

export const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        throw new AppError('User not found', 404);
    }
    res.status(204).send();
};