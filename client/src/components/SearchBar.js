import React from 'react';
import { TextField, InputAdornment, IconButton, Typography, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ setSearchQuery }) => {

    return (
        <Box sx={{ width: '100%', textAlign: 'center', mb: 4, mt: 10 }}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'monospace, sans-serif', fontWeight: 'bold', fontSize: '1.8rem' }}>
                Looking for something specific?
            </Typography>
            <TextField
                variant="outlined"
                placeholder="Search..."
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),

                }}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    '& .MuiOutlinedInput-root': {
                        fontSize: '1.2rem', // Larger font size for the input
                        fontFamily: 'monospace, sans-serif', // Custom font family
                        fontWeight: 'bold',
                        fontStyle: 'italic'
                    },
                }}
            />
        </Box>
    );
}

export default SearchBar;
