// redux/CartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Array of cart items
    },
    reducers: {
        addToCart: (state, action) => {
            const { productId, quantity, image, name, price } = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.productId === productId);

            if (existingItemIndex > -1) {
                // Update quantity if the item already exists
                state.items[existingItemIndex].quantity += quantity;
            } else {
                // Add new item to the cart
                state.items.push({ productId, quantity, image, name, price });
            }

            // Save to local storage
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart: (state, action) => {
            const { productId } = action.payload;
            // Remove item from cart based on productId
            state.items = state.items.filter(item => item.productId !== productId);
            // Save to local storage
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];

            // Clear from local storage
            localStorage.removeItem('cart');
        },
        loadCart: (state) => {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                state.items = JSON.parse(savedCart);
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;
