import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Card, CardMedia, CardContent, Typography, Button, IconButton, Box, TextField } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/UserSlice';
import { addToCart, removeFromCart } from '../redux/CartSlice';

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const { items: cartItems } = useSelector(state => state.cart);

    // Check if the product is in the cart
    const isInCart = cartItems.some(item => item.productId === product._id);

    useEffect(() => {
        // Log the cart items whenever the component is mounted or cart items change
        console.log('Cart Items:', cartItems);
    }, [cartItems]);

    const incrementQuantity = () => setQuantity(quantity + 1);
    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const toggleFavorite = async () => {
        if (!user || !user.data) {
            console.error("User data is not available");
            return;
        }

        try {
            const isFavorite = user.data.favorites.some(fav => fav._id === product._id);
            if (!isFavorite) {
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}products/addToFavorites`, { productId: product._id, userId: user.data.id }).then(res => console.log(res)).catch(err => console.log(err));
            } else {
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}products/removeFromFavorites`, { productId: product._id, userId: user.data.id }).then(res => console.log(res)).catch(err => console.log(err));
            }

            // Refetch the user to get the updated favorites
            const updatedUser = await dispatch(fetchUser(user.data.id)).unwrap();
            // Update local storage with the updated user data
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            console.error("Failed to toggle favorite:", error);
        }
    };

    const handleCartAction = () => {
        if (isInCart) {
            dispatch(removeFromCart({ productId: product._id }));
        } else {
            dispatch(addToCart({ productId: product._id, quantity, image: product.image, name: product.name, price: product.price}));
            console.log('removed')
        }
    };

    const isFavorite = user?.data?.favorites?.some(fav => fav._id === product._id);

    return (
        <Card sx={{ maxWidth: 345, m: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
            <CardMedia
                component="img"
                height="180"
                image={`${process.env.REACT_APP_BACKEND_URL}${product.image}`}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
            />

            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="div">
                        {product.name}
                    </Typography>
                    <IconButton
                        onClick={toggleFavorite}
                        sx={{ color: isFavorite ? 'red' : 'gray' }}
                    >
                        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Price: ${product.price.toFixed(2)}
                </Typography>

                <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                    <Box display="flex" alignItems="center">
                        <IconButton onClick={decrementQuantity}>
                            <RemoveIcon />
                        </IconButton>
                        <TextField
                            value={quantity}
                            variant="outlined"
                            size="small"
                            sx={{ width: '50px', textAlign: 'center' }}
                            inputProps={{ style: { textAlign: 'center' } }}
                        />
                        <IconButton onClick={incrementQuantity}>
                            <AddIcon />
                        </IconButton>
                    </Box>

                    <Button
                        variant="contained"
                        sx={{ backgroundColor: 'var(--primary-blue)', '&:hover': { backgroundColor: 'var(--secondary-blue)' } }}
                        endIcon={<AddShoppingCartIcon />} onClick={handleCartAction}
                    >
                        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
