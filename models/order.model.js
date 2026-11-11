import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'כמות חייבת להיות לפחות 1']
        },
        priceAtPurchase: {
            type: Number,
            required: true
        },
        specialRequests: {
            type: String,
            default: '',
            trim: true
        }
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items: {
            type: [orderItemSchema],
            required: true,
            validate: [v => v.length > 0, 'הזמנה חייבת לכלול לפחות פריט אחד']
        },
        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: String,
            enum: ['pending', 'in_preparation', 'ready_for_pickup', 'completed', 'cancelled'],
            default: 'pending'
        },
        fulfillmentType: {
            type: String,
            enum: ['pickup', 'delivery'],
            required: [true, 'יש לציין את סוג האספקה']
        },
        deliveryAddress: {
            type: String,
            required: function() {
                return this.fulfillmentType === 'delivery';
            }
        },
        pickupOrDeliveryDate: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;