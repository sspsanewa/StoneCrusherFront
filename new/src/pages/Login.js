import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, TextField, Button, Checkbox, FormControlLabel, Typography, Alert, InputAdornment } from '@mui/material';
import logo from '../assets/logo.png';
import Popup from '../components/Popup';
import Constant from '../Config/Color';
import { Helmet } from 'react-helmet';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import Url from '../Config/Url';
import Console from '../debug_log';
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import Language from '../Config/Language';



const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [keepSignedIn, setKeepSignedIn] = useState(false);
    const [error1, setError1] = useState('Please enter email address');
    const [error2, setError2] = useState('Please enter password');
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');


    const handleChange = (e) => {
        const { value } = e.target;
        setEmail(value);

        if (email.length > 50) {
            setError1('Email cannot be more than 50 characters');
        } else if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            setError1('Email address is not correct , please enter a valid email address');
        } else {
            setError1('');
        }

    };
    const handleChange1 = (e) => {
        const { value } = e.target;
        setPassword(value);

        if (value.length < 6) {
            setError2('Password cannot be less than 6 characters');
        } else if (value.length > 16) {
            setError2('Password cannot be more than 16 characters');
        } else {
            setError2('');
        }
    };

    const handleLogin = async () => {
        setShow(true);
        localStorage.setItem('token', 'nqfoh2oirgnwgosnvrioheg');
        localStorage.setItem('userId', 1);
        navigate(`/${APP_PREFIX_PATH}/dashboard`);
        const data = { action: 'sign-in', email: email, password: password };
        axios.post(`${Url}/auth/sign_in`, data)
            .then(res => {
                setData(res.data.data);
                if (!res.data.success) {
                    setMessage(res.data.msg);
                    setShow1(true);
                } else if (res.data.success) {
                    setShow(true);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userId', res.data.data.user_arr.user_id);
                }
            })
            .catch(err => console.log(err));
    };



    const [show1, setShow1] = React.useState(false);

    show1 && setTimeout(() => { setShow1(false); }, 4000);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <Box >
            <Helmet>
                <title>{Language.APP_NAME} | Login</title>
            </Helmet>

            <Box position={'relative'} display={'flex'} justifyContent={'center'} alignItems={'center'} marginTop={'50px'} gap={10} >
                <Box marginTop={5} position={'absolute'} left={'17%'} top={'15%'} display={{ xs: 'none', md: 'block' }}>
                    <img width={400} src={logo} alt='logo' />
                </Box>
                <Box height={420} position={'absolute'} right={'17%'} top={'15%'} sx={{ padding: '30px', border: '2px solid #5DC89A', borderRadius: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                        Please Login
                    </Typography>
                    <Typography width={300} color={'gray'} variant="subtitle1" gutterBottom>
                        Enter your registered account details for personalised experience.
                    </Typography>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={handleChange}
                        margin="normal"
                        error={error1}
                        helperText={error1}
                        sx={{ width: '350px' }}
                        type='email'
                    />

                    <TextField
                        label="Password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handleChange1}
                        margin="normal"
                        sx={{ width: '350px' }}

                        InputProps={{
                            endAdornment: (
                                <Button onClick={handleTogglePasswordVisibility}>
                                    {!showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </Button>
                            ),
                        }}
                        error={error2}
                        helperText={error2}
                    />

                    <Button

                        variant="contained"
                        color="primary"
                        onClick={handleLogin}

                        style={{ width: '300px', marginTop: '20px', backgroundColor: Constant.color[0] }}
                    >
                        Login
                    </Button>
                    <Button
                        onClick={() => navigate(`/${APP_PREFIX_PATH}/forgotPassword`)}
                        variant="text"
                        color="primary"
                        style={{ marginTop: '10px', fontSize: '12px' }}
                    >
                        Forgot Password?
                    </Button>
                </Box>
            </Box >
            {/* <Box marginTop={5} display={'flex'} justifyContent={'center'}>
                {show1 &&
                    <Alert sx={{ bgcolor: '#ffffff', marginBottom: '5px' }} variant="outlined" severity="error">
                        {message}
                    </Alert>
                }
            </Box> */}
        </Box>

    );
};

export default Login;