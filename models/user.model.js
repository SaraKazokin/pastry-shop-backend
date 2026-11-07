import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        fullname: {
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
)

const User = mongoose.model('User', userSchema);

export default User;