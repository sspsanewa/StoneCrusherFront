import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, TextField, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import logo from '../assets/logo.png'
import Popup from '../components/Popup';
import Constant from '../Config/Color'
import { Helmet } from 'react-helmet';
import Url from '../Config/Url';
import axios from 'axios';
import Console from '../debug_log';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import Language from '../Config/Language'

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [show, setShow] = useState(false);
    const [error1, setError1] = useState('Please enter password');
    const [data, setData] = useState([])
    const { id } = useParams()
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [error2, setError2] = useState('Please enter password');


    const handleChange1 = (e) => {
        const { value } = e.target;
        setNewPassword(value);

        if (value.length < 6) {
            setError1('Password cannot be less than 6 characters');
        } else if (value.length > 16) {
            setError1('Password cannot be more than 16 characters');
        } else {
            setError1('');
        }
    };

    const handleChange2 = (e) => {
        const { value } = e.target;
        setConfirmPassword(value);

        if (value.length < 6) {
            setError2('Password cannot be less than 6 characters');
        } else if (value.length > 16) {
            setError2('Password cannot be more than 16 characters');
        } else {
            setError2('');
        }
    };

    const handleResetPassword = () => {

        if (newPassword !== confirmPassword) {
            setError2('Password and confirm password fields must be equal')
            return
        }
        const data = { action: 'reset_password', user_id: id, newPassword: newPassword }
        Console("datas", data)
        axios.post(`${Url}/auth/resetpassword`, data)
            .then(res => {
                // setEmail(res.data.data[0].email)
                // setData(res.data.data)
                if (res.data.success) {
                    setShow(true)
                }
            })
            .then(err => console.log(err))


    }

    const navigate = useNavigate()


    const handleTogglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };
    const handleTogglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };
    return (
        <Box position={'relative'} display={'flex'} justifyContent={'center'} alignItems={'center'} marginTop={'50px'} gap={10} >
            <Helmet>
                <title>{Language.APP_NAME} | Reset Password</title>
            </Helmet>
            <Box marginTop={5} position={'absolute'} left={'17%'} top={'15%'}>
                <img width={400} src={logo} alt='logo' />

            </Box>
            <Box height={380} marginTop={3} position={'absolute'} right={'17%'} top={'15%'} sx={{ padding: '30px', border: '2px solid #5DC89A', borderRadius: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                <Typography variant="h5" gutterBottom>
                    Reset Password?
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Enter your new password
                </Typography>

                <TextField
                    required
                    label="New Password"
                    variant="outlined"
                    type={showPassword1 ? 'text' : 'password'}
                    value={newPassword}
                    onChange={handleChange1}
                    margin="normal"
                    error={error1}
                    helperText={error1}
                    sx={{ width: '350px' }}

                    InputProps={{
                        endAdornment: (
                            <Button onClick={handleTogglePasswordVisibility1}>
                                {!showPassword1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </Button>
                        ),
                    }}
                />
                <TextField
                    required
                    label="Confirm Password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={handleChange2}
                    margin="normal"
                    error={error2}
                    helperText={error2}
                    sx={{ width: '350px' }}
                    type={showPassword2 ? 'text' : 'password'}

                    InputProps={{
                        endAdornment: (
                            <Button onClick={handleTogglePasswordVisibility2}>
                                {!showPassword2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </Button>
                        ),
                    }}
                />
                <Button onClick={handleResetPassword} variant="contained" color="primary" style={{ width: '350px', marginTop: '20px', backgroundColor: Constant.color[0] }}>
                    <Popup show={show} button='Submit' message='Password reset successfully' path={`/${APP_PREFIX_PATH}/`} />
                </Button>

                <Button onClick={() => navigate(`/${APP_PREFIX_PATH}/`)} variant="text" color="primary" style={{ marginTop: '10px' }}>
                    Back To Login
                </Button>
            </Box>
        </Box>
    )
}

export default ResetPassword