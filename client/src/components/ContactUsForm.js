import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

import styles from "../styles/ContactUsFrom.module.css";

const ContactForm = () => {
    const [formValues, setFormValues] = useState({
        subject: '',
        content: ''
    });

    const whatsappNumber = process.env.REACT_APP_WP_NUMBER;

    const whatsappMessage = `Subject: ${formValues.subject}\nContent:\n${formValues.content}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        window.open(whatsappUrl, '_blank')
    };


    return (
        <div className={styles.wrapper}>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    maxWidth: 500,
                    margin: '0 auto',
                    padding: 3,
                    boxShadow: 3, /* Adds a shadow to make it pop */
                    borderRadius: 2,
                    backgroundColor: 'white',
                }}
            >
                <Typography variant="h4" sx={{ color: "var(--primary-accent)" }} gutterBottom>
                    Contact us
                </Typography>
                <TextField
                    label="Subject"
                    name="subject"
                    value={formValues.subject}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    required
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'var(--primary-accent)'
                        },
                    }}
                />
                <TextField
                    label="Content"
                    name="content"
                    value={formValues.content}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    required
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'var(--primary-accent)' // Input text color
                        },
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        mt: 2, backgroundColor: 'var(--primary-blue)', '&:hover': {
                            backgroundColor: 'var(--secondary-blue)',
                        },
                    }}
                >
                    Send!
                </Button>
            </Box>
        </div >

    );
};

export default ContactForm;
