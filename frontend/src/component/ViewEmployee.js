import { Autocomplete, Avatar, Box, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, styled } from '@mui/material';
import React, { useState } from 'react'
import profile1 from '../Images/profile1.jpg'
import { useNavigate, useParams } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
// import DropdownView from './DropdownView';


const rowsPerPageOptions = [5, 10, 25];
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const ViewEmployee = () => {
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

    React.useEffect(() => {
        axios.get('http://localhost:8080/api/v1/employee/' + 1)
            .then(res => {
                setSingleUser(res.data);
                //console.log(res.data)
            })
            .then(err => console.log(err))
    }, [id])

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
        <Box sx={{ width: '100%' }}>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography marginBottom={4} fontSize={20}>Add Detail</Typography>
                <Box display={'flex'}>
                    <Typography onClick={() => navigate('/home')} marginBottom={4} fontSize={15}>Dashboard </Typography>
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }}>

                <Grid marginY={5} item xs={12} md={12}>
                    <Item sx={{ borderRadius: '10px' }}>
                        <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={20}><b>Client Information</b></Typography>
                        <Grid padding={2} item md={12} display={'flex'} container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Typography margin={2}>Phone No:</Typography>
                                <Typography margin={2}>{singleUser.employeId}</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography margin={2}>Phone No:</Typography>
                                <Typography margin={2}>{singleUser.employeeFirstName}</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography margin={2}>Phone No:</Typography>
                                <Typography margin={2}>{singleUser.employeeLastName}</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography margin={2}>Phone No:</Typography>
                                <Typography margin={2}>{singleUser.employeeMobile}</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography margin={2}>Phone No:</Typography>
                                <Typography margin={2}>{singleUser.employeeMobile}</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography margin={2}>Phone No:</Typography>
                                <Typography margin={2}>{singleUser.employeeType}</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography margin={2}>Phone No:</Typography>
                                <Typography margin={2}>{singleUser.employeeSalary}</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography margin={2}>Phone No:</Typography>
                                <Typography margin={2}>{singleUser.employeeVillage}</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography margin={2}>Phone No:</Typography>
                                <Typography margin={2}>{singleUser.employeeAddress}</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography margin={2}>Phone No:</Typography>
                                <Typography margin={2}>{singleUser.employeeAadharcard}</Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography margin={2}>Phone No:</Typography>
                                <Typography margin={2}>{singleUser.dateOfJoining}</Typography>
                            </Grid>

                            <Grid item xs={12} md={4}>

                            </Grid>

                            <Grid item xs={12} md={4}>

                            </Grid>
                            <Grid item xs={12} md={4}>

                            </Grid>




                        </Grid>
                    </Item>
                </Grid>
                <Footer />
            </Box>
        </Box>




    )
}

export default ViewEmployee
