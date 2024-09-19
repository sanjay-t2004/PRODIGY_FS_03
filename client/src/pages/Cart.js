import React from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import { removeFromCart, clearCart } from '../redux/CartSlice';
import styles from "../styles/Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.user);

  const cartItemsIDS = cartItems.map(item => item.productId);

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);

  const handleRemove = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  const handleCheckout = async () => {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}orders/create`, { totalPrice, products: cartItemsIDS, userId: user.data.id }).then(res => console.log(res)).catch(err => console.log(err))
    dispatch(clearCart());
  };

  return (
    <main className={styles.wrapper}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        {cartItems?.length > 0 ? (
          <>
            {cartItems.map(item => (
              <Card key={item.productId} className={styles.cartItemCard}>
                <CardMedia
                  component="img"
                  className={styles.cartItemImage}
                  image={`${process.env.REACT_APP_BACKEND_URL}${item.image}`}
                  alt={item.name}
                />
                <CardContent className={styles.cartItemContent}>
                  <Typography variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {item.quantity}
                  </Typography>
                  <div className={styles.cartItemButtons}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleRemove(item.productId)}
                    >
                      Remove from Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <button
              className={styles.checkoutButton}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </>
        ) : (
          <Typography variant="body1" color="text.secondary">
            Your cart is empty.
          </Typography>
        )}

      </Box>
    </main>
  );
};

export default Cart;
