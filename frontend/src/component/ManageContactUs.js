import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
// import ManageContactUsTable from './Table/ManageContactUsTable';




const ManageContactUS
    = () => {
        const navigate = useNavigate()
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '150vh', bgcolor: '#f1f8e9' }}>
                <Grid paddingTop={1}>
                    <Grid display={'flex'} justifyContent={'space-between'} marginRight={4} marginBottom={4} item xs={12}>
                        <Box paddingY={1} paddingX={3} display='flex' flexDirection={'column'} >
                            <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={25}><b>Manage Contact US</b></Typography>
                            <Box display='flex' gap={1}>
                                <Typography onClick={() => { navigate('/dashboardPage') }} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={14}><b>Dashboard</b></Typography>
                                <Typography onClick={() => { navigate('/ManageContactUSPage') }} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={14}><b>/ Manage Contact Us</b></Typography>
                            </Box>
                        </Box>

                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    {/* <ManageContactUsTable /> */}
                </Grid>
                <Box >
                    <Footer />
                </Box>
            </Box>

        )
    }

export default ManageContactUS

