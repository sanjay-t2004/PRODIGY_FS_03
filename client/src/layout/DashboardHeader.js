import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Avatar, Typography } from '@mui/material';

const DashboardHeader = () => {
    const { user } = useSelector((state) => state.user);  // Assuming user data is stored in Redux
    const navigate = useNavigate();

    // Handle back button click to go to the home page
    const handleBackClick = () => {
        navigate('/');
    };

    console.log(user)

    return (
        <Box
            component="header"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: '#f5f5f5',
                borderBottom: '1px solid #ddd',
            }}
        >
            {/* Back Button */}
            <Button
                onClick={handleBackClick}
                sx={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    '&:hover': { backgroundColor: '#c0392b' },
                }}
            >
                Back to Home
            </Button>

            {/* User Information */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {/* Profile Picture */}
                <Avatar
                    src={user?.data?.profilePicture ? `${process.env.REACT_APP_BACKEND_URL}${user.data.profilePicture}` : ''}
                    alt={user?.data?.username}
                    sx={{
                        marginRight: '12px',
                        width: 40,
                        height: 40,
                    }}
                />
                {/* Username */}
                <Typography variant="h6">
                    {user?.data?.username}
                </Typography>
            </Box>
        </Box>
    );
};

export default DashboardHeader;
