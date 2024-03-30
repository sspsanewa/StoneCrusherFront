import { Box, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import * as React from 'react'
import profile from '../Images/logo.png'
import { TextField, Button, FormControl, RadioGroup, Radio, FormControlLabel, Avatar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

const Profile = () => {

    const [alignment, setAlignment] = React.useState('update');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [image, setImage] = React.useState('');
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [userId, setUserId] = React.useState()

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const responseId = await axios.get('http://localhost:5000/getId', {
                params: {
                    email: email
                }
            });
            const userId = responseId.data[0].user_id
            setUserId(userId)
            axios.put('http://localhost:5000/profileUpdate/', { userId, name, email, gender, mobile })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (err) {

            setError('Invalid username or password');
        }

    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        } else
            try {
                const responseId = await axios.get('http://localhost:5000/getId', {
                    params: {
                        email: email
                    }
                });
                const userId = responseId.data[0].user_id
                setUserId(userId)
                axios.put('http://localhost:5000/updatePassword/', { userId, newPassword })
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
    const navigate = useNavigate()

    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '150vh', bgcolor: '#f1f8e9' }}>
            <Grid paddingTop={1}>
                <Grid marginBottom={4} item xs={12}>
                    <Box paddingY={1} paddingX={3} display='flex' flexDirection={'column'} >
                        <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={25}><b>Dashboard</b></Typography>
                        <Box display='flex' gap={1}>
                            <Typography onClick={() => { navigate('/home') }} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={14}><b>Home</b></Typography>
                            <Typography onClick={() => { navigate('/home') }} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={14}><b>/ Dashboard</b></Typography>

                        </Box>
                    </Box>
                </Grid>
                <Grid marginX='3%' item xs={12}>
                    <Box paddingY='10px' justifyContent='space-around' borderRadius='10px' display='flex' sx={{ bgcolor: '#212121' }}>
                        <Box width={90} height={90} sx={{
                            borderRadius: '16px',
                            border: '3px solid #fff',
                            padding: '16px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Box>
                                <img id='img' width='80px' alt='profile' src={profile} />
                            </Box>
                        </Box>
                        <Box marginY='auto' color='#ffffff'>
                            <Typography>admin11<br /></Typography>
                            <Typography>info@mailinator.com</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid marginLeft={4} marginTop={2} item xs={12}>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="update">Update Profile</ToggleButton>
                        <ToggleButton value="change">Change Password</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                {
                    alignment === 'change' ?
                        <Grid marginTop={2} bgcolor='#ffffff' marginX={4} padding={2} item xs={12}>
                            <form onSubmit={handleSubmitPassword}>
                                <Box marginY={2} display='flex' justifyContent='space-around' alignItems='center'>

                                    <Box display={'flex'} flexDirection={'column'} textAlign={'start'} >
                                        <Typography marginY={2}> Old Password</Typography >
                                        <Typography marginY={2}>New Password</Typography>
                                        <Typography marginY={2}>Confirm Password</Typography>

                                    </Box>
                                    <Box marginY={2} display='flex' flexDirection={'column'} justifyContent='space-around' alignItems='center'>

                                        <TextField
                                            label="Old Password"
                                            type="password"
                                            value={oldPassword}
                                            size='small'
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            sx={{ width: '100%', marginY: '10px' }}
                                            required
                                        />
                                        <TextField
                                            label="New Password"
                                            type="password"
                                            value={newPassword}
                                            size='small'
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            sx={{ width: '100%', marginY: '10px' }}
                                            required
                                        />
                                        <TextField
                                            label="Confirm Password"
                                            type="password"
                                            value={confirmPassword}
                                            size='small'
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            sx={{ width: '100%', marginY: '10px' }}
                                            required
                                        />


                                    </Box>
                                    <Box display='flex' justifyContent='center' alignItems='center' >
                                        <Button sx={{ bgcolor: '#212121' }} type="submit" variant="contained" color="primary">
                                            Submit
                                        </Button>
                                    </Box>
                                </Box>

                            </form>
                        </Grid> :
                        <Grid marginTop={2} bgcolor='#ffffff' marginX={4} padding={2} item xs={12}>
                            <form onSubmit={handleUpdate}>
                                <Box marginY={2} display='flex' justifyContent='space-around' alignItems='center'>
                                    {image && <Avatar sx={{ width: "100px", height: '100px' }} alt="User Image" src={image} />}

                                    <Box display={'flex'} flexDirection={'column'} >
                                        <Typography marginY={2}> User Name</Typography >
                                        <Typography marginY={2}>Email Address</Typography>
                                        <Typography marginY={2}>Gender</Typography>
                                        <Typography marginY={2}>Mobile</Typography>
                                        <Typography marginY={2}>Image</Typography>
                                    </Box>
                                    <Box marginY={2} display='flex' flexDirection={'column'} justifyContent='space-around' alignItems='center'>
                                        <TextField

                                            label="User Name"
                                            value={name}
                                            size='small'
                                            onChange={(e) => setName(e.target.value)}
                                            sx={{ width: '100%', marginY: '10px' }}
                                            required
                                        />

                                        <TextField
                                            label="Email Address"
                                            type="email"
                                            value={email}
                                            size='small'
                                            onChange={(e) => setEmail(e.target.value)}
                                            sx={{ width: '100%', marginY: '10px' }}
                                            required
                                        />

                                        <FormControl sx={{ width: '100%' }} required>
                                            <RadioGroup
                                                aria-label="gender"
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                row
                                                sx={{ marginY: '10px' }}
                                            >
                                                <Box display={'flex'}>
                                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                                </Box>
                                            </RadioGroup>
                                        </FormControl>

                                        <TextField
                                            label="Mobile"
                                            type="tel"
                                            size='small'
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            sx={{ width: '100%', marginY: '10px' }}
                                            required
                                        />

                                        <input
                                            accept="image/*"
                                            id="contained-button-file"
                                            type="file"
                                            style={{ display: 'none', marginY: '10px' }}
                                            onChange={handleImageChange}
                                        />

                                        <Box gap={4} display='flex' sx={{ width: '100%', marginY: '10px' }}>

                                            <label htmlFor="contained-button-file">
                                                <Button size='small' variant="outlined" component="span">
                                                    Choose Image
                                                </Button>
                                            </label>

                                        </Box>

                                    </Box>
                                    <Box display='flex' justifyContent='center' alignItems='center' >
                                        <Button sx={{ bgcolor: '#212121' }} type="submit" variant="contained" color="primary">
                                            Submit
                                        </Button>
                                    </Box>
                                </Box>
                            </form>
                        </Grid>
                }


            </Grid>
        </Box >
    )
}

export default Profile
