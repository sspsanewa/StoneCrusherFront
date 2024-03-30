import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import Footer from './Footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Reply = () => {
    const [subject, setSubject] = React.useState('');
    const [message, setMessage] = React.useState('');
    const { id } = useParams()

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/sendReply/' + id, { subject, message })
            .then(res => {
                console.log(res);
                navigate('/dashboardPage')
            })
            .catch(err => {
                console.log(err)
            })
    };
    const navigate = useNavigate()
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '150vh', bgcolor: '#f1f8e9' }}>
            <Grid paddingTop={1} paddingBottom={4} >
                <Grid marginBottom={4} item xs={12}>
                    <Box paddingY={1} paddingX={3} display='flex' flexDirection={'column'} >
                        <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={25}><b>Send Reply</b></Typography>
                        <Box display='flex' gap={1}>
                            <Typography onClick={() => { navigate('/dashboardPage') }} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={14}><b>Dashboard</b></Typography>
                            <Typography onClick={() => { navigate('/dashboardPage') }} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={14}><b>Manage Contact Us</b></Typography>
                            <Typography onClick={() => { navigate('/replyPage') }} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={14}><b>/ Send Reply</b></Typography>
                        </Box>
                    </Box>
                </Grid>
                <Box borderRadius={2} bgcolor='#ffffff' marginX={4} >
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <Container>
                                <form onSubmit={handleUpdate}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Subject"
                                                variant="outlined"
                                                fullWidth
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Message"
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid marginBottom={2} item xs={12}>
                                            <Button sx={{ height: '27px', bgcolor: '#212121' }} type="submit" variant="contained" color="primary">
                                                Send
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Container>
                        </Grid>
                    </Grid>
                </Box>
                <Footer />
            </Grid>

        </Box>
    )
}

export default Reply
