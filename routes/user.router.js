import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';

import validate from '../middlewares/validation.middleware.js';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema.js';

const router = express.Router();

router.route('/')
    .get(getUsers)
    .post(validate(createUserSchema), createUser);

router.route('/:id')
    .get(getUserById)
    .put(validate(updateUserSchema), updateUser)
    .delete(deleteUser);

export default router;