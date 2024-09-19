import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./redux/UserSlice";
import cartReducer from "./redux/CartSlice";

export const store = configureStore({
    reducer: {
        user: UserReducer,
        cart: cartReducer,
    }
})