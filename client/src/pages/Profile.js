import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";

import { Card, CardMedia, CardContent, Typography, Box, Avatar, Grid, List, ListItem, ListItemText } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from '../styles/Profile.module.css'; // For any additional custom styles

const Profile = () => {
    const { user } = useSelector(state => state.user);
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}users/one/${user.data.id}`);
        setOrders(response?.data?.payload?.data?.orderHistory)
    }

    console.log(orders)

    useEffect(() => {
        fetchOrders();
    }, [])

    if (!user || !user.data) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    const { firstName, lastName, profilePicture, favorites } = user.data;


    return (
        <main className={styles.wrapper}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                <Avatar
                    alt={`${firstName} ${lastName}`}
                    src={`${process.env.REACT_APP_BACKEND_URL}${profilePicture}`}
                    sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Typography variant="h4" component="h1">
                    {firstName} {lastName}
                </Typography>
            </Box>

            <Typography variant="h5" component="h2" gutterBottom>
                Favorite Products
            </Typography>

            {favorites.length > 0 ? (
                <Grid container spacing={3}>
                    {favorites.map(favorite => (
                        <Grid item xs={12} sm={6} md={4} key={favorite._id}>
                            <Card className={styles.favoriteCard}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`${process.env.REACT_APP_BACKEND_URL}${favorite.image}`}
                                    alt={favorite.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {favorite.name}
                                    </Typography>
                                    <FavoriteIcon sx={{ color: 'red' }} />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="body1" color="text.secondary">
                    You don't have any favorites yet.
                </Typography>
            )}

            {/* Order History Section */}
            <Typography variant="h6" component="h3" sx={{ mt: 4 }}>
                Order History
            </Typography>
            {orders?.length > 0 ? (
                <List>
                    {orders.map((order, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={`Order #${order._id} - Total: $${order.totalPrice.toFixed(2)}`}
                                secondary={`Status: ${order.status ? 'Delivered' : 'Not Delivered'}`}
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    No order history.
                </Typography>
            )}

        </main>
    );
};

export default Profile;
