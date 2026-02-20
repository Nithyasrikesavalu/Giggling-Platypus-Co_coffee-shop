import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    productId: { type: Number },
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    type: { type: String }
});

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },

    // ✅ Extended status for live tracking
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
        default: 'pending'
    },

    customerName: { type: String },
    customerEmail: { type: String },
    userEmail: { type: String },
    user: { type: String },
    customerPhone: { type: String },
    deliveryAddress: { type: String },
    paymentMethod: { type: String, enum: ['cash', 'card', 'upi'], default: 'cash' },
    cashGiven: { type: Number },
    balanceReturned: { type: Number },
    notes: { type: String }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
