import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Grid, TextField, Button, Checkbox, FormControlLabel, Typography, Alert } from '@mui/material';
import logo from '../assets/logo.png'
import Popup from '../components/Popup';
import Constant from '../Config/Color'
import { Helmet } from 'react-helmet';
import Url from '../Config/Url';
import axios from 'axios';
import Console from '../debug_log';
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import Language from '../Config/Language'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(false);
    const [error1, setError1] = useState('Please enter email address');
    const [data, setData] = useState([])
    const [message, setMessage] = useState('')
    const [show1, setShow1] = React.useState(false)

    const handleChange = (e) => {
        const { value } = e.target;
        setEmail(value);


        if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            setError1('Email address is not correct , please enter a valid email address');
        } else if (email.length > 50) {
            setError1('Email cannot be more than 50 characters');
        } else {
            setError1('');
        }

    };

    const handleForgotPassword = () => {

        const data = { action: 'forgot_password', email: email }

        axios.post(`${Url}/auth/forgotpassword`, data)
            .then(res => {

                if (res.data.success) {
                    setShow(true)
                    console.log("final", res.data.data.user_id)
                    localStorage.setItem('ResetId', btoa(res.data.data.user_id.toString()))
                } else {
                    setMessage('Email address is not correct , please enter a valid email address')
                    setShow1(true)
                }
            })
            .then(err => console.log(err))


    }

    const navigate = useNavigate()



    Console("emailzz", email)
    return (
        <Box marginTop={10} >
            <Helmet>
                <title>{Language.APP_NAME} | Forgot Password</title>
            </Helmet>
            <Box position={'relative'} display={'flex'} justifyContent={'center'} alignItems={'center'} marginTop={'50px'} gap={10} >
                <Box position={'absolute'} left={'17%'} top={'15%'}>
                    <img width={400} src={logo} alt='logo' />
                </Box>
                <Box marginTop={3} position={'absolute'} right={'17%'} top={'15%'} sx={{ padding: '30px', border: '2px solid #5DC89A', borderRadius: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                    <Typography variant="h5" gutterBottom>
                        Forgot Password?
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Enter your email to get a password reset link
                    </Typography>

                    <TextField
                        required
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={handleChange}
                        margin="normal"
                        error={error1}
                        helperText={error1}
                        sx={{ width: '350px' }}
                    />
                    <Button onClick={handleForgotPassword} variant="contained" color="primary" style={{ width: '350px', marginTop: '20px', backgroundColor: Constant.color[0] }}>
                        <Popup show={show} button='Reset link send' message='Reset link send successfully' path='`/${APP_PREFIX_PATH}/`' />
                    </Button>

                    <Button onClick={() => navigate(`/${APP_PREFIX_PATH}/`)} variant="text" color="primary" style={{ marginTop: '10px' }}>
                        Back To Login
                    </Button>
                </Box>
            </Box>
            {/* <Box marginTop={5} display={'flex'} justifyContent={'center'}>
                {show1 &&
                    <Alert sx={{ bgcolor: '#ffffff', marginBottom: '5px' }} variant="outlined" severity="error">
                        {message}
                    </Alert>
                }
            </Box> */}
        </Box>
    )
}

export default ForgotPassword