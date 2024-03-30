import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import logo from '../Images/logo.png';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Popup from '../component/Popup';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(true);
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            console.log('ddd', email)
            axios.put('http://localhost:5000/forgotPassword/', { email })
                .then(res => {
                    console.log(res);
                    console.log("aa gaya response")
                    navigate('/')
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (err) {

            setError('Invalid username or password');
        }
    };
    return (
        <Box display={'flex'} >
            <Box
                display={{ xs: 'none', md: 'block' }}
                borderRadius={'5px'}
                width={1300}
                height={500}
                bgcolor='#212121'
                marginLeft={'20%'}
                marginTop={'70px'}
            >
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                >
                    <Grid item>
                        <img width={250} src={logo} alt='logo' />
                    </Grid>
                </Grid>

            </Box>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                marginRight={{ xs: '0', md: '20%' }}
            >

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                    <Typography variant="h5" gutterBottom>
                        Forgot Password?
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Enter your email to get a password reset link
                    </Typography>

                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        size='small'
                        fullWidth
                    />


                    <Button onClick={handleForgotPassword} fullWidth variant="contained" color="primary" style={{ marginTop: '20px', backgroundColor: '#212121' }}>
                        <Popup show={show} button='Forgot Password' message='Password reset link has been sent on this email' path='/' />
                    </Button>

                    <Button onClick={() => navigate('/')} variant="text" color="primary" style={{ marginTop: '10px' }}>
                        Back To Login
                    </Button>
                </div>
            </Grid>
        </Box>
    );
};

export default ForgotPassword;
