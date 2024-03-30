import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import Card from '../component/Card'
import { useNavigate } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate';

import Constant from '../config/Constant'
const Dashboard = () => {
    const navigate = useNavigate()
    const [userCount, setUserCount] = useState();
    const [providerCount, setProviderCount] = useState()
    const [contactCount, setContactCount] = useState();
    const [earningCount, setEarningCount] = useState()
    // React.useEffect(() => {
    //     axios.get('http://localhost:5000/manageUser/')
    //         .then(res => {
    //             setUserCount(res.data.length)

    //         })
    //         .then(err => console.log(err))
    // }, [])

    // React.useEffect(() => {
    //     axios.get('http://localhost:5000/manageProvider/')
    //         .then(res => {
    //             setProviderCount(res.data.length)

    //         })
    //         .then(err => console.log(err))
    // }, [])


    // React.useEffect(() => {
    //     axios.get('http://localhost:5000/manageContact/')
    //         .then(res => {
    //             setContactCount(res.data.length)
    //         })
    //         .then(err => console.log(err))
    // }, [])

    // React.useEffect(() => {
    //     axios.get('http://localhost:5000/manageEarning/')
    //         .then(res => {
    //             setEarningCount(res.data.length)

    //         })
    //         .then(err => console.log(err))
    // }, [])

    return (
        <Box sx={{ width: '100%' }}>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography marginBottom={4} fontSize={20} >Dashboard</Typography>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'} sx={{ width: '100%', borderRadius: '15px', paddingRight: '10px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Card nav='/guestUserPage' title='Total Guest Users' users='20' icon={<GroupsIcon sx={{ fontSize: '3rem' }} />} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card nav='/vipUserPage' title='Total VIP Users' users='111' icon={<GroupsIcon sx={{ fontSize: '3rem' }} />} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card nav='/topPostPage' title='Total Top Posts' users='23' icon={<AddPhotoAlternate sx={{ fontSize: '3rem' }} />} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card nav='/localPostPage' title='Total Local Posts' users='45' icon={<AddPhotoAlternate sx={{ fontSize: '3rem' }} />} />
                    </Grid>
                </Grid>
            </Box>
        </Box >

    )
}

export default Dashboard
