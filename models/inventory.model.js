import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: [true, 'נא להזין את שם חומר הגלם'],
            trim: true
        },
        quantity: {
            type: Number,
            required: [true, 'נא להזין  כמות קיימת במלאי'],
            min: [0, 'מלאי לא יכול להיות שלילי']
        },
        unit: {
            type: String,
            required: [true, 'נא להזין את יחידת המידה'],
            trim: true
        },
        minThreshold: {
            type: Number,
            required: [true, 'נא להזין את סף המינימום להתראה'],
            min: [0, 'סף המינימום לא יכול להיות שלילי']
        },
        lastRestocked: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;