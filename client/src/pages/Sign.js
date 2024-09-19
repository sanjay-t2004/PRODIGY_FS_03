import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Box } from '@mui/material';

const Sign = () => {
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);  // Toggle state

    useEffect(() => {
        if (user != null) navigate('/');
    }, [user, navigate]);

    // Toggle between Sign-in and Sign-up forms
    const toggleForm = () => {
        setIsSignup(!isSignup);
    };

    // Handle the "Back" button click to navigate to the home or previous page
    const handleBackClick = () => {
        navigate('/');  // Change this to any route where the user should go
    };

    // Framer motion animation variants
    const formVariant = {
        hidden: { opacity: 0, x: -200 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, x: 200, transition: { duration: 0.5 } },
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: 3,
                backgroundColor: '#f5f5f5',
            }}
        >
            <AnimatePresence mode="wait">
                {isSignup ? (
                    <motion.div
                        key="signup"
                        variants={formVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <Signup />
                    </motion.div>
                ) : (
                    <motion.div
                        key="signin"
                        variants={formVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <Signin />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <Button
                onClick={toggleForm}
                sx={{
                    mt: 2,
                    color: '#2980b9',
                    '&:hover': { color: '#1c5985' },
                }}
            >
                {isSignup
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
            </Button>

            <Button
                onClick={handleBackClick}
                sx={{
                    mt: 2,
                    color: 'white',
                    backgroundColor: '#e74c3c',
                    '&:hover': { backgroundColor: '#c0392b' },
                }}
            >
                {isSignup ? 'Continue Without Signing Up' : 'Continue Without Signing In'}
            </Button>
        </Box>
    );
};

export default Sign;
