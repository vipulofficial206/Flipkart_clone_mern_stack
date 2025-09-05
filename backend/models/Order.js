import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        quantity: { type: Number, default: 1 }
    }],
    shippingAddress: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    orderStatus: { type: String, default: 'Processing' },
    paymentStatus: { type: String, default: 'Pending' },
}, { timestamps: true });

export default model('Order', OrderSchema);