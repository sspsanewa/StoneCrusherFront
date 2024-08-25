import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Url from '../Config/Url';
import { styled } from '@mui/material/styles';
import Console from '../debug_log';
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CategoryIcon from '@mui/icons-material/Category';
import Language from '../Config/Language'
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import DashboardClientList from './DashboardClientList';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Dashboard = () => {
    const [expenseAmount, setExpenseAmount] = useState([])
    const [collectionAmount, setCollectionAmount] = useState([])

    React.useEffect(() => {
        // const params = { action: 'get_dashboard_data' };
        // axios.get(`${Url}/api/v1/report/today`)
        //     .then(res => {
        //         setData(res.data)
        //         console.log(data);
        //     })
        //     .catch(err => console.log("eroor", err))

        axios.get(`${Url}/api/v1/expense/today/amount`)
            .then(res => {
                setExpenseAmount(res.data.amount)
            })
            .catch(err => console.log("eroor", err))


        axios.get(`${Url}/api/v1/client/today/amount`)
            .then(res => {
                setCollectionAmount(res.data.amount)
            })
            .catch(err => console.log("eroor", err))

    }, [])

    return (
        <Box paddingY={4} paddingX={8} marginBottom={10} >
            <Helmet>
                <title>{Language.APP_NAME} | Dashboard</title>
            </Helmet>

            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography fontSize={20} marginBottom={2} >Dashboard</Typography>
            </Box>
            <Box sx={{ width: '100%', borderRadius: '15px', paddingRight: '10px' }}>
                <Grid paddingY={1} container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Item >
                            <Card nav={`/${APP_PREFIX_PATH}/collectionlist`} title="Today Collection" users={collectionAmount} icon={<GroupsIcon sx={{ fontSize: '2rem' }} />} />
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Item >
                            <Card nav={`/${APP_PREFIX_PATH}/todayexpenselist`} title="Today Expense" users={expenseAmount} icon={<GroupsIcon sx={{ fontSize: '2rem' }} />} />
                        </Item>
                    </Grid>
                    <DashboardClientList />
                    {/* <Grid item xs={12} md={4}>
                        <Item>
                            <Card nav={`/${APP_PREFIX_PATH}/Triplist`} title="Total Trips" users={data.musas} icon={<DirectionsCarFilledIcon sx={{ fontSize: '2rem' }} />} />
                        </Item>
                    </Grid> */}
                    {/* <Grid item xs={12} md={4}>
                        <Item>
                            <Card nav={`/${APP_PREFIX_PATH}/cars`} title="Total Cars" users={data.categories} icon={<ModeOfTravelIcon sx={{ fontSize: '2rem' }} />} />
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Item>
                            <Card nav={`/${APP_PREFIX_PATH}/subscription`} title="Total Subscriptions" users={data.sub_categories} icon={<LoyaltyIcon sx={{ fontSize: '2rem' }} />} />
                        </Item>
                    </Grid> */}
                </Grid>
            </Box>
        </Box >

    )
}

export default Dashboard
