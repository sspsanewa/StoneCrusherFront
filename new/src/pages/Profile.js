import { Box, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import { TextField, Button, FormControl, RadioGroup, Radio, FormControlLabel, Avatar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Popup from '../components/Popup';
import Constant from '../Config/Color'
import profile from '../assets/profile1.jpg'
import { Helmet } from 'react-helmet';
import Url from '../Config/Url'
import axios from 'axios';
import Console from '../debug_log';
import { APP_PREFIX_PATH, IMAGE_PATH } from '../Config/AppConfig';
import PopupImage from '../components/PopupImage';
import Language from '../Config/Language'

const Profile = (props) => {
    const [admin, setAdmin] = useState([])
    const [alignment, setAlignment] = useState('update');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [mobile, setMobile] = useState('');
    const [image, setImage] = useState('');
    const [images, setImages] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [userId, setUserId] = useState('')
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');
    const [error3, setError3] = useState('');
    const [clickImage, setClickImage] = useState(false)
    const [clickedButton, setClickedButton] = React.useState('update');


    const handleClick = (event, newAlignment) => {
        setAlignment(newAlignment);
        setClickedButton(newAlignment);

    };

    const handleImageChange = (e) => {

        const file = e.target.files[0];
        console.log("image file", file)
        setImage(file);
        // const reader = new FileReader();
        // reader.onloadend = () => {
        //     setImage(reader.result);
        // };
        // if (file) {
        //     reader.readAsDataURL(file);
        // }
    };


    const handleChange1 = (e) => {
        const { value } = e.target;
        setPassword(value);
        if (password === '') {
            setError1('Please enter password')
        } else if (password.length < 5) {
            setError1('Password cannot be less than 6 characters');
        } else if (password.length > 16) {
            setError1('Password cannot be more than 16 characters');
        } else {
            setError1('');
        }
    };

    const handleChange2 = (e) => {
        const { value } = e.target;
        setNewPassword(value);

        if (password === '') {
            setError2('Please enter password')
        } else if (newPassword.length < 5) {
            setError2('Password cannot be less than 6 characters');
        } else if (newPassword.length > 16) {
            setError2('Password cannot be more than 16 characters');
        } else {
            setError2('');
        }

    };

    const handleChange3 = (e) => {
        const { value } = e.target;
        setConfirmPassword(value);

        if (password === '') {
            setError3('Please enter password')
        } else if (confirmPassword.length < 5) {
            setError3('Password cannot be less than 6 characters');
        } else if (confirmPassword.length > 16) {
            setError3('Password cannot be more than 16 characters');
        } else {
            setError3('');
        }
    };

    React.useEffect(() => {

        const params = {
            action: 'get_profile', user_id: localStorage.getItem('userId')
        }
        axios.get(`${Url}/auth/profile`, { params })
            .then(obj => {
                const res = obj.data;
                setAdmin(res.data.user_arr)
                setEmail(admin.email)
                setUserName(admin.name)
                setMobile(admin.mobile)
                setImages(admin.image)

                // navigate('/profile')

            })
            .catch(err => console.log(err))
    }, [admin.email, admin.name, admin.mobile, admin.image])



    const handleUpdate = (event) => {
        event.preventDefault();
        console.log("image after update", image)
        const user_id = localStorage.getItem('userId')

        try {

            const formData = new FormData();

            // Append other form fields if needed
            formData.append('action', 'edit_profile');
            formData.append('email', email);
            formData.append('mobile', mobile);
            formData.append('user_id', user_id);
            formData.append('name', userName);

            // Append the image file
            formData.append('image', image);
            axios.post(`${Url}/auth/editprofile`, formData, {
                headers: {
                    // 'Content-Type': 'multipart/form-data',

                }
            })
                .then(obj => {
                    const res = obj.data;
                    setAdmin(res.data.user_arr)
                    setEmail(admin.email)
                    setUserName(admin.name)
                    setMobile(admin.mobile)
                    setImages(admin.image)
                    { props.change ? props.setChange(false) : props.setChange(true) }
                    setShow(true)
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (err) {

            setError(err);
        }

    };

    const handleSubmitPassword = (event) => {
        event.preventDefault();
        if (password === '') {
            setError1('Please enter password')
        }

        if (password === '') {
            setError2('Please enter password')
        }


        if (password === '') {
            setError3('Please enter password')
        }
        const data = {
            action: 'update password',
            user_id: localStorage.getItem('userId'),
            password: password,
            newPassword: newPassword,
            user_id: 1
        }
        try {
            if (newPassword === confirmPassword) {
                console.log("old and new", password, newPassword)
                axios.post(`${Url}/auth/updatepassword`, data)
                    .then(res => {
                        if (res.data.success) {
                            setShow(true)
                            setMessage(res.data.msg)
                        }

                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                setError3('Password and confirm password fields must be equal')
            }
        } catch (err) {

            setError(err);
        }
    }

    const navigate = useNavigate()

    return (

        <Box paddingY={4} paddingX={8} marginBottom={10}  >
            <Helmet>
                <title>{Language.APP_NAME} | Profile</title>
            </Helmet>
            <Grid >
                <Grid item xs={12}>
                    <Box display='flex' justifyContent={'space-between'} alignItems={'center'} >
                        <Box marginBottom={2} gap={1} display={'flex'}>
                            <Button sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/dashboard`)}  >
                                Dashboard
                            </Button>
                            <Typography marginTop={1.2} fontSize={20} >/</Typography>

                            <Typography marginTop={1.2} fontSize={20} >Profile</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box paddingY='10px' justifyContent='left' gap={20} borderRadius='10px' display='flex' sx={{ bgcolor: Constant.color[0] }}>
                        <Box width={90} height={90} sx={{
                            borderRadius: '16px',
                            border: '3px solid #fff',
                            padding: '16px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: '60px',
                        }}>
                            <Box >
                                {clickImage ? <PopupImage images={images} setClickImage={setClickImage} /> :
                                    <img onClick={() => setClickImage(true)} id='img' width='80px' alt={images} src={`${IMAGE_PATH}` + images} />
                                }

                            </Box>
                        </Box>
                        <Box marginY='auto' color='#ffffff'>
                            <Typography>{email}<br /></Typography>
                            <Typography>{userName}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid marginTop={2} item xs={12}>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        aria-label="Platform"
                    >

                        <ToggleButton style={{ backgroundColor: clickedButton === 'update' ? Constant.color[0] : 'inherit', color: clickedButton === 'update' ? 'white' : 'blue', }} value="update" onClick={(e) => handleClick(e, 'update')}>Update Profile</ToggleButton>
                        <ToggleButton style={{ backgroundColor: clickedButton === 'change' ? Constant.color[0] : 'inherit', color: clickedButton === 'change' ? 'white' : 'blue', }} value="change" onClick={(e) => handleClick(e, 'change')}>Change Password</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                {
                    alignment === 'change' ?
                        <Grid sx={{ borderRadius: '5px' }} marginTop={2} bgcolor={Constant.color[1]} marginX={0} padding={2} item xs={12}>
                            <form onSubmit={handleSubmitPassword}>
                                <Box marginY={2} display='flex' justifyContent='start' alignItems='center'>
                                    <Box display={'flex'} flexDirection={'column'} textAlign={'start'} >
                                        <Typography > Old Password</Typography >
                                        <TextField
                                            label="Old Password"
                                            type="password"
                                            value={password}
                                            size='small'
                                            onChange={handleChange1}
                                            sx={{ width: { xs: '300px', md: '600px' }, marginY: '10px' }}
                                            error={error1}
                                            helperText={error1}
                                        />
                                        <Typography >New Password</Typography>
                                        <TextField
                                            label="New Password"
                                            type="password"
                                            value={newPassword}
                                            size='small'
                                            onChange={handleChange2}
                                            sx={{ width: { xs: '300px', md: '600px' }, marginY: '10px' }}
                                            error={error2}
                                            helperText={error2}
                                        />
                                        <Typography >Confirm Password</Typography>
                                        <TextField
                                            label="Confirm Password"
                                            type="password"
                                            value={confirmPassword}
                                            size='small'
                                            onChange={handleChange3}
                                            sx={{ width: { xs: '300px', md: '600px' }, marginY: '10px' }}
                                            error={error3}
                                            helperText={error3}
                                        />

                                    </Box>

                                </Box>
                                <Box display='flex' justifyContent='center' alignItems='center' >
                                    <Button size='small' style={{ backgroundColor: Constant.color[0] }} type="submit" variant="contained" color="primary">
                                        <Popup show={show} button='Update' message={message} path={`/${APP_PREFIX_PATH}/profile`} />
                                    </Button>
                                </Box>
                            </form>
                        </Grid> :
                        <Grid sx={{ borderRadius: '5px' }} marginTop={2} bgcolor={Constant.color[1]} marginX={0} padding={2} item xs={12}>
                            <form onSubmit={handleUpdate}>

                                <Box marginY={2} display='flex' justifyContent='space-around' alignItems='center'>
                                    {/* {image && <Avatar sx={{ width: "100px", height: '100px' }} alt="User Image" src={image} />} */}

                                    <Box display={'flex'} flexDirection={'column'} >
                                        <Typography marginY={2}> User Name</Typography >
                                        <Typography marginY={2}>Email Address</Typography>
                                        <Typography marginY={2}>Mobile</Typography>
                                        <Typography marginY={2}>Image</Typography>
                                    </Box>
                                    <Box marginY={2} display='flex' flexDirection={'column'} justifyContent='space-around' alignItems='center'>
                                        <TextField

                                            label="User Name"
                                            value={userName}
                                            size='small'
                                            onChange={(e) => setUserName(e.target.value)}
                                            sx={{ width: '300px', marginY: '10px' }}
                                            required
                                        />

                                        <TextField
                                            label="Email Address"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            size='small'
                                            sx={{ width: '300px', marginY: '10px' }}
                                            required
                                        />

                                        <TextField
                                            label="Mobile"
                                            type="tel"
                                            size='small'
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            sx={{ width: '300px', marginY: '10px' }}
                                            required
                                        />

                                        <input
                                            width='300px'
                                            accept="image/*"
                                            id="contained-button-file"
                                            type="file"
                                            style={{ display: 'none', marginY: '10px' }}
                                            onChange={handleImageChange}
                                        />

                                        <Box gap={4} display='flex' sx={{ width: '100%', marginY: '10px' }}>

                                            <label htmlFor="contained-button-file">
                                                <Button sx={{ width: '300px' }} variant="outlined" component="span">
                                                    Choose Image
                                                </Button>
                                            </label>

                                        </Box>

                                    </Box>

                                </Box>
                                <Box display='flex' justifyContent='center' alignItems='center' >
                                    <Button type='submit' size='small' style={{ backgroundColor: Constant.color[0] }} variant='contained'>
                                        <Popup button='Update' message='Profile updated successfully' path={`/${APP_PREFIX_PATH}/profile`} show={show} />
                                    </Button>
                                </Box>
                            </form>
                        </Grid>
                }

            </Grid>
        </Box >
    )
}

export default Profile
