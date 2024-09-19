import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    profilePicture: {
        type: String,
        required: false,
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: false
    }],
    orderHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: false
    }]
})

const User = model("User", userSchema);
export default User;