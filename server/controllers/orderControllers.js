import Order from "../models/orderModel.js"
import User from "../models/userModel.js";

// create
export const createOrder = async (req, res) => {
    try {
        const { totalPrice, products, userId } = req.body;
        const order = await Order.create({ totalPrice, products, userId });

        const user = await User.findById(userId);

        await User.findByIdAndUpdate(userId, {
            orderHistory: [...user.orderHistory, order._id]
        }, { new: true });

        return res.status(201).json({
            message: "order created successfully!",
            payload: order
        })
    } catch (error) {
        res.status(500).json({ message: "problem creating order!", error: error.message })
        console.log(error)
    }
}

// edit
export const editOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { totalPrice, products, status } = req.body;
        const order = await Order.findByIdAndUpdate(id, { totalPrice, products, status }, { new: true });
        return res.status(200).json({
            message: "order edited successfully!",
            payload: order
        })
    } catch (error) {
        res.status(500).json({ message: "problem editing order!", error: error.message })
        console.log(error)
    }
}

// delete
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: "Order not found!" });
        }

        await Order.findByIdAndDelete(id);

        // Find the user and remove the order from their orderHistory
        await User.findByIdAndUpdate(order.userId, {
            $pull: { orderHistory: id }
        }, { new: true });


        return res.status(200).json({
            message: "order deleted successfully!",
            payload: order
        })
    } catch (error) {
        res.status(500).json({ message: "problem deleting order!", error: error.message })
        console.log(error)
    }
}

// get one
export const getOneOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) return res.status(404).send('order does not exist');

        return res.status(200).json({
            message: "order found successfully!",
            payload: order
        })
    } catch (error) {
        res.status(500).json({ message: "problem fetching order!", error: error.message })
        console.log(error)
    }
}

// get all
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        return res.status(200).json({
            message: "orders fetched successfully!",
            payload: orders
        })
    } catch (error) {
        res.status(500).json({ message: "problem fetching orders!", error: error.message })
        console.log(error)
    }
}

// delete all
export const orderThanos = async (req, res) => {
    try {
        // Find all users first to update their orderHistory
        const users = await User.find();

        // Delete all orders
        await Order.deleteMany({});

        // Clear orderHistory for each user
        await Promise.all(users.map(async (user) => {
            await User.findByIdAndUpdate(user._id, { orderHistory: [] });
        }));

        return res.status(200).json({
            message: "All orders deleted successfully and order history cleared for all users!"
        });

    } catch (error) {
        res.status(500).json({ message: "problem deleting orders!", error: error.message })
        console.log(error)
    }
}