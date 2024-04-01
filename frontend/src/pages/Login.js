import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Popup from '../component/Popup';
import logo from '../Images/logo.png';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [keepSignedIn, setKeepSignedIn] = useState(false);
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState()
    const [userId, setUserId] = useState()

    const navigate = useNavigate();

    const handleLogin = async () => {
        setShow(true)
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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

                        Login


                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Access to our dashboard
                    </Typography>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        size='small'
                        fullWidth
                        error={error}
                        helperText={error}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        size='small'
                        InputProps={{
                            endAdornment: (
                                <Button onClick={handleTogglePasswordVisibility}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </Button>
                            ),
                        }}
                        error={error}
                        helperText={error}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={keepSignedIn}
                                onChange={(e) => setKeepSignedIn(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Keep me signed in"
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        style={{ marginTop: '20px', backgroundColor: '#212121' }}
                    >
                        <Popup show={show} button='Login' message='Login Successfully' path='/home' />
                    </Button>
                    <Button
                        onClick={() => navigate('/forgotPassword')}
                        variant="text"
                        color="primary"
                        style={{ marginTop: '10px' }}
                    >
                        Forgot Password?
                    </Button>
                </div>
            </Grid>
        </Box>
    );
};

export default Login;
