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
    //     axios.get('http://localhost:5000/viewSingleUser/' + id)
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
                                <img style={{ borderRadius: '100%' }} width={160} src={profile1} alt='profile' />
                                <Grid item xs={12}>
                                    <Grid display={'flex'} xs={12}>
                                        <Typography margin={2}>Name:</Typography>
                                        <Typography margin={2}></Typography>
                                    </Grid>
                                    <Grid display={'flex'} xs={12}>
                                        <Typography margin={2}>Email:</Typography>
                                        <Typography margin={2}>{singleUser[0].email}</Typography>
                                    </Grid>
                                    <Grid display={'flex'} xs={12}>
                                        <Typography margin={2}>Phone No:</Typography>
                                        <Typography margin={2}>{singleUser[0].mobile}</Typography>
                                    </Grid>
                                    <Grid display={'flex'} xs={12}>
                                        <Typography margin={2}>Status:</Typography>
                                        <Typography margin={2}>{singleUser[0].active_flag}</Typography>
                                    </Grid>
                                    <Grid display={'flex'} xs={12}>
                                        <Typography margin={2}>Create Date & Time:</Typography>
                                        <Typography margin={2}>{singleUser[0].createtime}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Grid padding={5} bgcolor={'#ffffff'} marginLeft={5} marginY={5} display={'flex'} gap={20}>
                    <Typography fontSize={20}>Total Wallet Amount :</Typography>
                    <Box>
                        {viewUserRecharge.wallet_amount}
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
                        <ToggleButton value="recharge">My Recharge History</ToggleButton>
                        <ToggleButton value="call">Call History</ToggleButton>

                    </ToggleButtonGroup>
                </Grid>
                {
                    alignment === 'call' ?
                        <Box padding={2} marginTop={2} borderRadius={2} bgcolor='#ffffff' marginX={4} >
                            <Box display='flex' justifyContent='space-between'>
                                <Typography style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray', width: '150px' }} fontSize={18}><b>My Post</b></Typography>
                                <TextField
                                    label="Search contact"
                                    variant="outlined"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    size='small'
                                />
                            </Box>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>S.No</TableCell>
                                            <TableCell>Image</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Call Type</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Minutes</TableCell>
                                            <TableCell>Create Date and Time</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {viewUserCall.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post, index) => (
                                            <TableRow key={post.id}>
                                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                                <TableCell>{post.image}</TableCell>
                                                <TableCell>{post.name}</TableCell>
                                                <TableCell>{post.email}</TableCell>
                                                <TableCell>{post.call_type}</TableCell>
                                                <TableCell>{post.total_price}</TableCell>
                                                <TableCell>{post.time}</TableCell>
                                                <TableCell>{post.createtime}</TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={rowsPerPageOptions}
                                    component="div"
                                    count={viewUserCall.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableContainer>
                        </Box>
                        : (alignment === 'recharge' &&
                            <Box padding={2} marginTop={2} borderRadius={2} bgcolor='#ffffff' marginX={4} >
                                <Box display='flex' justifyContent='space-between'>
                                    <Typography fontSize={'15px'}>Rows Per Page: {rowsPerPage}</Typography>
                                    <Autocomplete
                                        sx={{ width: '50%', marginLeft: '50%' }}
                                        size='small'
                                        id="free-solo-demo"
                                        freeSolo
                                        options={viewUserRecharge.map((option) => option.name)}
                                        renderInput={(params) => <TextField {...params} label="Search..." />}
                                    />
                                </Box>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>S.No</TableCell>
                                                <TableCell>User_Id</TableCell>
                                                <TableCell>User Name</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Amount Status</TableCell>
                                                <TableCell>Wallet Amount</TableCell>

                                                <TableCell>Create Date and Time</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {viewUserRecharge.map((user, index) => (
                                                <TableRow TableRow key={user.id} >
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{user.name}</TableCell>
                                                    <TableCell>{user.email}</TableCell>
                                                    <TableCell>{user.amount_status}</TableCell>

                                                    <TableCell>{user.wallet_amount}</TableCell>

                                                    <TableCell>{user.createtime}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <TablePagination
                                        rowsPerPageOptions={rowsPerPageOptions}
                                        component="div"
                                        count={viewUserRecharge.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </TableContainer>
                            </Box>

                        )

                }

            </Grid >
            <Footer />
        </Box >
    )
}

export default View
