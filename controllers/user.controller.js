import User from '../models/user.model.js';
import AppError from "../utils/AppError.js";
import GenerateToken from '../utils/jwt.js';

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

    const token = GenerateToken(user);
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ user: userResponse, token });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new AppError('Email and password are required', 400);
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
        throw new AppError('Invalid email or password', 401)
    }

    const token = GenerateToken(user);
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ user: userResponse, token });
};

export const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        throw new AppError('User not found', 404);
    }
    
    Object.assign(user, req.body);
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(200).json(userResponse);
};

export const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        throw new AppError('User not found', 404);
    }
    res.status(204).send();
};