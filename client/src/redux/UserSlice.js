import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signinUser = createAsyncThunk(
    'user/singinUser',
    async (userCredentials) => {
        const request = axios.post(`${process.env.REACT_APP_BACKEND_URL}users/login`, userCredentials);
        const response = (await request).data.payload;
        localStorage.setItem('user', JSON.stringify(response));
        return response;
    }
)

export const signupUser = createAsyncThunk(
    'user/singinUser',
    async (userCredentials) => {
        const request = axios.post(`${process.env.REACT_APP_BACKEND_URL}users/signup`, userCredentials, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        const response = (await request).data.payload;
        localStorage.setItem('user', JSON.stringify(response));
        return response;
    }
)

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (userId) => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}users/one/${userId}`);
        return response.data.payload;
    }
);


const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
        error: null,
    },
    reducers: {
        addToCart: (state, action) => {
            if (state.user) {
                const updatedCart = [...state.user.cart, action.payload];
                state.user.cart = updatedCart;
            }
        },
        signOutUser: (state) => {
            state.user = null;
            state.error = null;
            localStorage.removeItem('user'); // Clear the user from localStorage
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signinUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;

            })
            .addCase(signinUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(signinUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                if (action.error.message === "Request failed with status code 401") {
                    state.error = "Access Denied: Invalid Credentials";
                } else {
                    state.error = action.error.message;
                }
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
});

export const { addToCart, signOutUser } = userSlice.actions;

export default userSlice.reducer;