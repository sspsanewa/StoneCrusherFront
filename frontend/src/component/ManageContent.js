import { Box, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import * as React from 'react'
import { TextField, Button } from '@mui/material';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';

const ManageContent = () => {
    const [about, setAbout] = useState('')
    const [privacy, setPrivacy] = useState('')
    const [terms, setTerms] = useState('')
    const [ios, setIos] = useState('')
    const [android, setAndroid] = useState('')
    const [message, setMessage] = useState('')
    const [alignment, setAlignment] = useState('about');
    const [input1, setInput1] = useState('')
    const [input2, setInput2] = useState('')
    const [input3, setInput3] = useState('')

    const handleInputChange1 = (newValue) => {
        setInput1(newValue);
        if (input1.blocks && input1.blocks.length > 0) setAbout(input1.blocks[0].text)
    };
    const handleInputChange2 = (newValue) => {
        setInput2(newValue);
        if (input2.blocks && input2.blocks.length > 0) setPrivacy(input2.blocks[0].text)

    };
    const handleInputChange3 = (newValue) => {
        setInput3(newValue);
        if (input3.blocks && input3.blocks.length > 0) setTerms(input3.blocks[0].text)
    };
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const navigate = useNavigate()

      React.useEffect(() => {
        axios.get('http://localhost:5000/manageContent/')
            .then(res => {

                res.data.map((content)=> {
                    if(content.content_type===0) setAbout(content.content_1)
                    if(content.content_type===1) setPrivacy(content.content_1)
                    if(content.content_type===2) setTerms(content.content_1)
                    if(content.content_type===3) setIos(content.content_1)
                    if(content.content_type===4) setAndroid(content.content_1)
                    if(content.content_type===5) setMessage(content.content_1)
                })
          console.log("all", res.data)
            })
            .then(err => console.log( err))
    }, [])

    
    const handleUpdateAbout = (event) => {

        event.preventDefault();
        axios.put('http://localhost:5000/manageAboutContent/', { about })
            .then(res => {
                console.log(res);
                navigate('/manageContentPage')
            })
            .catch(err => {
                console.log(err)
            })
    };

    const handleUpdatePrivacy = (event) => {

        event.preventDefault();
        axios.put('http://localhost:5000/managePrivacyContent/', { privacy })
            .then(res => {
                console.log(res);
                navigate('/manageContentPage')
            })
            .catch(err => {
                console.log(err)
            })
    };

    const handleUpdateTerms = (event) => {

        event.preventDefault();
        axios.put('http://localhost:5000/manageTermsContent/', { terms })
            .then(res => {
                console.log(res);
                navigate('/manageContentPage')
            })
            .catch(err => {
                console.log(err)
            })
    };

    const handleUpdateIos = (event) => {

        event.preventDefault();
        axios.put('http://localhost:5000/manageIosContent/', { ios })
            .then(res => {
                console.log(res);
                navigate('/manageContentPage')
            })
            .catch(err => {
                console.log(err)
            })
    };

    const handleUpdateAndroid = (event) => {

        event.preventDefault();
        axios.put('http://localhost:5000/manageAndroidContent/', { android })
            .then(res => {
                console.log(res);
                navigate('/manageContentPage')
            })
            .catch(err => {
                console.log(err)
            })
    };

    const handleUpdateMessage = (event) => {

        event.preventDefault();
        axios.put('http://localhost:5000/manageMessageContent/', { message })
            .then(res => {
                console.log(res);
                navigate('/manageContentPage')
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '150vh', bgcolor: '#f1f8e9' }}>
            <Grid position='relative' paddingTop={1} >
                <Grid marginBottom={4} bgcolor='#ffffff' item xs={12}>
                    <Box paddingY={1} paddingX={3} display='flex' flexDirection={'column'} >
                        <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={25}><b>Manage Contents</b></Typography>
                        <Box display='flex' gap={1}>
                            <Typography onClick={() => { navigate('/manageContentPage') }} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={14}><b>Dashboard</b></Typography>
                            <Typography onClick={() => { navigate('/manageContentPage') }} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={14}><b>/ Manage Contents</b></Typography>
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
                        <ToggleButton value="about">About Us</ToggleButton>
                        <ToggleButton value="privacy">Privacy Policy</ToggleButton>
                        <ToggleButton value="terms">Terms & Conditions</ToggleButton>
                        <ToggleButton value="ios">Rate App Ios</ToggleButton>
                        <ToggleButton value="android">Rate App Android</ToggleButton>
                        <ToggleButton value="message">Share Message</ToggleButton>

                    </ToggleButtonGroup>
                </Grid>

                {
                    alignment === 'about' ?
                        <Grid paddingBottom={2} marginTop={2} bgcolor='#ffffff' marginX={4} padding={2} item xs={12}>
                            <Typography marginBottom={4} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={18}><b>About Us</b></Typography>
                            <Editor onChange={handleInputChange1} />
                            <Button onClick={handleUpdateAbout} sx={{ bgcolor: '#212121' }} size='small' variant="contained">Update</Button>
                        </Grid> : (
                            alignment === 'privacy' ?
                                <Grid marginTop={2} bgcolor='#ffffff' marginX={4} padding={2} item xs={12}>
                                    <Typography marginBottom={4} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={18}><b>Privacy Policy</b></Typography>
                                    <Editor onChange={handleInputChange2} />
                                    <Button onClick={handleUpdatePrivacy} sx={{ bgcolor: '#212121' }} size='small' variant="contained">Update</Button>
                                </Grid> : (
                                    alignment === 'terms' ?
                                        <Grid marginTop={2} bgcolor='#ffffff' marginX={4} padding={2} item xs={12}>
                                            <Typography marginBottom={4} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={18}><b>Terms & Conditions</b></Typography>
                                            <Editor  onChange={handleInputChange3} />
                                            <Button onClick={handleUpdateTerms} sx={{ bgcolor: '#212121' }} size='small' variant="contained">Update</Button>
                                        </Grid> : (
                                            alignment === 'ios' ?
                                                <Grid marginTop={2} bgcolor='#ffffff' marginX={4} padding={2} item xs={12}>
                                                    <Typography marginBottom={4} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={18}><b>Rate App Ios</b></Typography>
                                                    <TextField
                                                        marginBottom={4}
                                                        size='small'
                                                        label="type here..."
                                                        value={ios}
                                                        onChange={(e) => setIos(e.target.value)}
                                                        fullWidth
                                                        sx={{ width: '100%' }}
                                                    />
                                                    <Button onClick={handleUpdateIos} sx={{ bgcolor: '#212121', marginTop: '20px' }} size='small' variant="contained">Update</Button>
                                                </Grid> : (
                                                    alignment === 'android' ?
                                                        <Grid marginTop={2} bgcolor='#ffffff' marginX={4} padding={2} item xs={12}>
                                                            <Typography marginBottom={4} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={18}><b>Rate App Android</b></Typography>
                                                            <TextField
                                                                marginBottom={4}
                                                                size='small'
                                                                label="type here..."
                                                                value={android}
                                                                onChange={(e) => setAndroid(e.target.value)}
                                                                fullWidth
                                                                sx={{ width: '100%' }}
                                                            />
                                                            <Button onClick={handleUpdateAndroid} sx={{ marginTop: '20px', bgcolor: '#212121' }} size='small' variant="contained">Update</Button>
                                                        </Grid> : (
                                                            <Grid marginTop={2} bgcolor='#ffffff' marginX={4} padding={2} item xs={12}>
                                                                <Typography marginBottom={4} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={18}><b>Share message</b></Typography>
                                                                <TextField
                                                                    marginBottom={4}
                                                                    size='small'
                                                                    label="type here..."
                                                                    value={message}
                                                                    onChange={(e) => setMessage(e.target.value)}
                                                                    fullWidth
                                                                    sx={{ width: '100%' }}
                                                                />
                                                                <Button onClick={handleUpdateMessage} sx={{ marginTop: '20px', bgcolor: '#212121' }} size='small' variant="contained">Update</Button>
                                                            </Grid>
                                                        )
                                                )
                                        )
                                )
                        )

                }

                <Box marginTop={14}>
                    <Footer />
                </Box>
            </Grid>

        </Box>
    )
}

export default ManageContent
