import React, { useEffect, useState } from 'react';
import axios from "axios";

import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

import SearchBar from '../components/SearchBar';
import ProductsDisplay from '../components/ProductsDisplay';
import Loading from "../components/Loading.js";
import styles from "../styles/Store.module.css";


const Store = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleProductFetch = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}products/get`, { searchQuery, categoryId: selectedCategory });
            setProducts(response.data.payload);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleCategoryFetch = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}category/get`);
            setCategories(response.data.payload);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleProductFetch();
        handleCategoryFetch();
    }, [searchQuery, selectedCategory])

    return (
        <main className={styles.wrapper}>
            <SearchBar setSearchQuery={setSearchQuery} />

            {/* Category Filter */}
            <Box sx={{ mt: 2, mb: 3, display: 'flex', justifyContent: 'center' }}>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Filter by Category</InputLabel>
                    <Select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        label="Filter by Category"
                    >
                        <MenuItem value="">
                            All
                        </MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {isLoading ? <Loading /> : <ProductsDisplay products={products} selectedCategory={selectedCategory} />}
        </main>
    );
};

export default Store;
