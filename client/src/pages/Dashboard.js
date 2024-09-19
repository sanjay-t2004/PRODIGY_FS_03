import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, Tabs, Tab, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const Dashboard = () => {
    const [tabValue, setTabValue] = useState(0);
    const [productDetails, setProductDetails] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        categoryId: '',
        image: null,
    });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        // Fetch products
        axios.post(`${process.env.REACT_APP_BACKEND_URL}products/get`, { searchQuery: "", categoryId: "" })
            .then(response => {
                setProducts(response.data.payload);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });

        // Fetch categories
        axios.get(`${process.env.REACT_APP_BACKEND_URL}category/get`)
            .then(response => {
                setCategories(response.data.payload);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setProductDetails({
            name: '',
            description: '',
            price: '',
            quantity: '',
            categoryId: '',
            image: null,
        });
        setSelectedProduct(null);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductDetails({ ...productDetails, [name]: value });
    };

    const handleImageChange = (event) => {
        setProductDetails({ ...productDetails, image: event.target.files[0] });
    };

    const handleProductSelect = (event) => {
        const product = products.find(p => p._id === event.target.value);
        setSelectedProduct(product);
        setProductDetails({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            categoryId: product.categoryId,
            image: null,
        });
    };

    const handleSubmit = async () => {
        try {
            let formData = new FormData();
            Object.keys(productDetails).forEach(key => {
                if (productDetails[key] !== null && productDetails[key] !== '') {
                    formData.append(key, productDetails[key]);
                }
            });

            let response;
            switch (tabValue) {
                case 0: // Add
                    response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}products/create`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                    break;
                case 1: // Edit
                    response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}products/edit/${selectedProduct._id}`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                    break;
                case 2: // Delete
                    response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}products/delete/${selectedProduct._id}`);
                    break;
                default:
                    return;
            }

            if (response.data.payload) {
                setSnackbarMessage(`Product ${tabValue === 0 ? 'added' : tabValue === 1 ? 'updated' : 'deleted'} successfully!`);
                setSnackbarSeverity('success');
            }
        } catch (error) {
            setSnackbarMessage(`Error: ${error.message}`);
            setSnackbarSeverity('error');
        }
        setOpenSnackbar(true);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>Product Management</Typography>

            <Tabs value={tabValue} onChange={handleTabChange} aria-label="product actions">
                <Tab label="Add Product" />
                <Tab label="Edit Product" />
                <Tab label="Delete Product" />
            </Tabs>

            <Box sx={{ padding: 2 }}>
                {tabValue !== 2 && (
                    <>
                        <TextField
                            label="Name"
                            name="name"
                            value={productDetails.name}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={productDetails.description}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Price"
                            name="price"
                            type="number"
                            value={productDetails.price}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Quantity"
                            name="quantity"
                            type="number"
                            value={productDetails.quantity}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="categoryId"
                                value={productDetails.categoryId}
                                onChange={handleInputChange}
                            >
                                {categories.map(category => (
                                    <MenuItem key={category._id} value={category._id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ mt: 2, mr: 3 }}
                        >
                            Upload Image
                            <input
                                type="file"
                                name="image"
                                hidden
                                onChange={handleImageChange}
                            />
                        </Button>
                    </>
                )}

                {tabValue === 1 && (
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Product</InputLabel>
                        <Select
                            value={selectedProduct?._id || ''}
                            onChange={handleProductSelect}
                        >
                            {products.map(product => (
                                <MenuItem key={product._id} value={product._id}>
                                    {product.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                {tabValue === 2 && (
                    <>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Product</InputLabel>
                            <Select
                                value={selectedProduct?._id || ''}
                                onChange={handleProductSelect}
                            >
                                {products.map(product => (
                                    <MenuItem key={product._id} value={product._id}>
                                        {product.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Delete Product
                        </Button>
                    </>
                )}

                {tabValue !== 2 && (
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        {tabValue === 0 ? 'Add Product' : 'Update Product'}
                    </Button>
                )}
            </Box>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Dashboard;
