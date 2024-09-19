import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema({
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Order = model("Order", orderSchema);
export default Order;