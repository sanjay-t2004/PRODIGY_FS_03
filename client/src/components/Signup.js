import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Box, Typography } from '@mui/material';
import { signupUser } from '../redux/UserSlice';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    const { loading, error } = useSelector((state) => state.user);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    // Handle file selection for profile picture
    const handleImageChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        let userCredentials = {
            username, password, firstName, lastName, phone, image: profilePicture
        }

        dispatch(signupUser(userCredentials)).then(result => {
            if (result.payload) {
                setUsername('');
                setPassword('');
                setFirstName('');
                setLastName('');
                setPhone('');
                setProfilePicture('');
                navigate('/');
            }
        });

    };


    useEffect(() => {
        console.log(username, password, firstName, lastName, phone, profilePicture);
    }, [username, password, firstName, lastName, phone, profilePicture])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3,
                backgroundColor: '#f5f5f5'
            }}
        >
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                Sign Up
            </Typography>

            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>

                <TextField
                    fullWidth
                    label="first Name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    required
                />

                <TextField
                    fullWidth
                    label="last Name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    required
                />

                <TextField
                    fullWidth
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    required
                />

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    required
                />

                <TextField
                    fullWidth
                    label="Phone Number"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    required
                />


                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    sx={{ mt: 2, backgroundColor: '#2980b9', '&:hover': { backgroundColor: '#1c5985' } }}
                >
                    Upload Profile Picture
                    <input
                        type="file"
                        name='image'
                        hidden
                        onChange={handleImageChange}
                    />
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{ mt: 2, backgroundColor: '#2980b9', '&:hover': { backgroundColor: '#1c5985' } }}
                >
                    {loading ? "Signing up..." : "Sign up"}
                </Button>
                {error && <Typography color="error" sx={{ mt: 2 }}>Problem signing up</Typography>}
            </form>
        </Box>
    );
};

export default Signup;
