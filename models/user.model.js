import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'נא להזין שם מלא'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'נא להזין כתובת אימייל'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'נא להזין סיסמה']
        },
        phone: {
            type: String,
            required: [true, 'נא להזין מספר טלפון'],
            trim: true
        },
        role: {
            type: String,
            enum: ['customer', 'baker', 'admin'],
            default: 'customer'
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
};

export const User = mongoose.model('User', userSchema);