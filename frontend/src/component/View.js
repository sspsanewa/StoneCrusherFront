import { Autocomplete, Avatar, Box, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import React, { useState } from 'react'
import profile1 from '../Images/profile1.jpg'
import { useNavigate, useParams } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
// import DropdownView from './DropdownView';


const rowsPerPageOptions = [5, 10, 25];

const View = () => {
    const { id } = useParams()
    const [searchTerm, setSearchTerm] = React.useState('');

    const [viewUserRecharge, setViewUserRecharge] = React.useState([])
    const [viewUserCall, setViewUserCall] = React.useState([])
    const [singleUser, setSingleUser] = useState([{}])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [alignment, setAlignment] = React.useState('recharge');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const navigate = useNavigate()
    console.log('111111111', id)

    // React.useEffect(() => {
    //     axios.get('http://localhost:8080/api/v1/client/' + id)
    //         .then(res => {
    //             setSingleUser(res.data);
    //         })
    //         .then(err => console.log(err))
    // }, [id])

    // React.useEffect(() => {
    //     axios.get('http://localhost:5000/viewUserRecharge/' + id)
    //         .then(res => {
    //             setViewUserRecharge(res.data);
    //         })
    //         .then(err => console.log(err))
    // }, [id])

    // React.useEffect(() => {
    //     axios.get('http://localhost:5000/viewUserCall/' + id)
    //         .then(res => {
    //             setViewUserCall(res.data);
    //         })
    //         .then(err => console.log(err))
    // }, [id])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '250vh', bgcolor: '#f1f8e9' }}>
            <Grid paddingTop={1}  >
                <Grid marginBottom={4} bgcolor='#ffffff' item xs={12}>
                    <Box paddingY={1} paddingX={3} display='flex' flexDirection={'column'} >
                        <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={25}><b>View User</b></Typography>
                        <Box display='flex' gap={1}>
                            <Typography onClick={() => { navigate('/dashboardPage') }} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={14}><b>Dashboard</b></Typography>
                            <Typography onClick={() => { navigate('/userListPage') }} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={14}><b>/ User List</b></Typography>
                            <Typography onClick={() => { navigate('/viewPage') }} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={14}><b>/ View Page</b></Typography>

                        </Box>
                    </Box>

                </Grid>


                <Box borderRadius={2} bgcolor='#ffffff' marginX={4} >
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <Box paddingX={2} paddingTop={2} >
                                <Typography style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={18}><b>View User Detail </b></Typography>
                                <Grid item xs={12}>
                                    <Grid marginTop={1} xs={12}>
                                        <Typography >Name:</Typography>
                                        <Box marginTop={1} display={'flex'} justifyContent={'left'} alignItems={'center'} height={50} sx={{ border: '2px solid gray', borderRadius: '10px' }}>
                                            <Typography marginLeft={1}>Sandeep patidar</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid marginTop={1} xs={12}>
                                        <Typography >Email:</Typography>
                                        <Box marginTop={1} display={'flex'} justifyContent={'left'} alignItems={'center'} height={50} sx={{ border: '2px solid gray', borderRadius: '10px' }}>
                                            <Typography marginLeft={1}>sandeep@gmail.com</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid xs={12}>
                                        <Typography >Phone No:</Typography>
                                        <Box marginTop={1} display={'flex'} justifyContent={'left'} alignItems={'center'} height={50} sx={{ border: '2px solid gray', borderRadius: '10px' }}>
                                            <Typography marginLeft={1}>1234567891</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid xs={12}>
                                        <Typography >Status:</Typography>
                                        <Box marginTop={1} display={'flex'} justifyContent={'left'} alignItems={'center'} height={50} sx={{ border: '2px solid gray', borderRadius: '10px' }}>
                                            <Typography marginLeft={1}>active</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid xs={12}>
                                        <Typography >Create Date & Time:</Typography>
                                        <Box marginTop={1} display={'flex'} justifyContent={'left'} alignItems={'center'} height={50} sx={{ border: '2px solid gray', borderRadius: '10px' }}>
                                            <Typography marginLeft={1}>2024/05/21 08:30 pm</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid >
            <Footer />
        </Box >
    )
}

export default View
