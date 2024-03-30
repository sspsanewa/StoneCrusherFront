import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Autocomplete, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import dayjs from 'dayjs';
import axios from 'axios';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function AddDetail() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        date: '',
        village: '',
        address: '',
        mobile: '',
        size: '',
        cubicMeter: '',
        gstNumber: '',
        cgst: '',
        sgst: '',
        royalty: '',
        sno: '',
        firm: '',
        paymentMode: '',
        collectedBy: '',
        rate: '',
        amount: '',
        discount: ''

    });


    if (formData.size !== '') {
        formData.size = parseInt(formData.size);
    }
    if (formData.cubicMeter !== '') {
        formData.cubicMeter = parseInt(formData.cubicMeter);
    }
    if (formData.cgst !== '') {
        formData.cgst = parseInt(formData.cgst);
    }
    if (formData.sgst !== '') {
        formData.sgst = parseInt(formData.sgst);
    }
    if (formData.royalty !== '') {
        formData.royalty = parseInt(formData.royalty);
    }
    if (formData.rate !== '') {
        formData.rate = parseInt(formData.rate);
    }
    if (formData.amount !== '') {
        formData.amount = parseInt(formData.amount);
    }

    if (formData.discount !== '') {
        formData.discount = parseInt(formData.discount);
    }


    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle date separately
        if (name === 'date') {
            const formattedDate = dayjs(value).format('YYYY-MM-DD'); // Change the format as needed
            setFormData({
                ...formData,
                [name]: formattedDate
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };



    formData.amount = formData.size * formData.rate
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)
        axios.post('http://localhost:8080/api/v1/client', formData)
            .then(res => {
                navigate('/addDetailPage')
            })
            .catch(err => {
                console.log(err)
            })
    };
    const navigate = useNavigate()
    //ddddddddddddddd
    return (
        <Box sx={{ width: '100%' }}>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography marginBottom={4} fontSize={20} >Add Detail</Typography>
                <Box display={'flex'}>
                    <Typography onClick={() => navigate('/dashboardPage')} marginBottom={4} fontSize={15} >Dashboard </Typography>

                </Box>


            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <form onSubmit={handleSubmit}>

                    <Grid container spacing={2}>

                        <Grid item xs={12} md={12}>
                            <Item sx={{ borderRadius: '10px' }}>
                                <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={20}><b>Client Information</b></Typography>
                                <Grid padding={2} item md={12} display={'flex'} container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            required
                                            label="First Name"
                                            variant="outlined"
                                            name='firstName'
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            label="Last Name"
                                            variant="outlined"
                                            name='lastName'
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            required
                                            label="Village"
                                            variant="outlined"
                                            name='village'
                                            value={formData.village}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid marginTop={1} item xs={12} md={4}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    label="Basic date picker"
                                                    value={formData.date}
                                                    onChange={(date) => handleChange({ target: { name: 'date', value: date } }
                                                    )}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            required
                                            label="Address"
                                            variant="outlined"
                                            name='address'
                                            value={formData.address}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            required
                                            label="Mobile"
                                            variant="outlined"
                                            name='mobile'
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Item sx={{ borderRadius: '10px' }}>
                                <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={20}><b>Material Information</b></Typography>

                                <Grid padding={2} item md={12} display={'flex'} container spacing={2}>
                                    <Grid marginTop={2} item xs={12} md={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Size</InputLabel>
                                            <Select
                                                required
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name='size'
                                                value={formData.size}
                                                label="Size"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={10}>20mm</MenuItem>
                                                <MenuItem value={20}>10mm</MenuItem>
                                                <MenuItem value={30}>4mm(msand)</MenuItem>
                                                <MenuItem value={40}>Dust</MenuItem>
                                                <MenuItem value={50}>Gsb</MenuItem>
                                                <MenuItem value={60}>Wmm</MenuItem>

                                            </Select>
                                        </FormControl>
                                        {formData.size === '' && <FormHelperText>This field is required.</FormHelperText>}
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            required
                                            label="Cubic Meter"
                                            variant="outlined"
                                            name='cubicMeter'
                                            value={formData.cubicMeter}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Item sx={{ borderRadius: '10px' }}>
                                <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={20}><b>GST & Loyalti Information</b></Typography>

                                <Grid padding={2} item md={12} display={'flex'} container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            label="GST Number"
                                            variant="outlined"
                                            name='gstNumber'
                                            value={formData.gstNumber}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />

                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            label="CGST Amount"
                                            variant="outlined"
                                            name='cgst'
                                            value={formData.cgst}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />

                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            label="SGST Amount"
                                            variant="outlined"
                                            name='sgst'
                                            value={formData.sgst}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />

                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            label="Royalty Amount"
                                            variant="outlined"
                                            name='royalty'
                                            value={formData.royalty}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Item sx={{ borderRadius: '10px' }}>
                                <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={20}><b>Paymnet Information</b></Typography>

                                <Grid padding={2} item md={12} display={'flex'} container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            required
                                            label="S.NO"
                                            variant="outlined"
                                            name='sno'
                                            value={formData.sno}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid marginTop={2} item xs={12} md={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-autowidth-label">Firm</InputLabel>
                                            <Select
                                                required
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth"
                                                name='firm'
                                                value={formData.firm}
                                                onChange={handleChange}
                                                autoWidth
                                                label="firm"
                                            >

                                                <MenuItem value={'Balaji Stone Crusher'}>Balaji Stone Crusher</MenuItem>
                                                <MenuItem value={'Shree Shyam Mining'}>Shree Shyam Mining</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {formData.firm === '' && <FormHelperText>This field is required.</FormHelperText>}
                                    </Grid>
                                    <Grid marginTop={2} item xs={12} md={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="pay">Payment Mode</InputLabel>
                                            <Select
                                                required
                                                labelId="pay"
                                                id="paymentMode"
                                                name='paymentMode'
                                                value={formData.paymentMode}
                                                onChange={handleChange}
                                                autoWidth
                                                label="Payment"
                                            >

                                                <MenuItem value={'Online'}>Online</MenuItem>
                                                <MenuItem value={'Cash'}>Cash</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {formData.paymentMode === '' && <FormHelperText>This field is required.</FormHelperText>}

                                    </Grid>
                                    <Grid marginTop={2} item xs={12} md={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="collection">Collected By</InputLabel>
                                            <Select
                                                required
                                                labelId="collection"
                                                id="collection"
                                                name='collectedBy'
                                                value={formData.collectedBy}
                                                onChange={handleChange}
                                                autoWidth
                                                label="collection"
                                            >

                                                <MenuItem value={'Dinesh'}>Dinesh</MenuItem>
                                                <MenuItem value={'Ghanshyam'}>Ghanshyam</MenuItem>
                                                <MenuItem value={'Rahul'}>Rahul</MenuItem>
                                                <MenuItem value={'Sunil'}>Sunil</MenuItem>

                                            </Select>
                                        </FormControl>
                                        {formData.collectedBy === '' && <FormHelperText>This field is required.</FormHelperText>}

                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            required
                                            label="Rate"
                                            variant="outlined"
                                            name='rate'
                                            type='number'
                                            value={formData.rate}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            required
                                            label="Amount"
                                            variant="outlined"
                                            name='amount'
                                            type='number'
                                            value={formData.amount}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />

                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            required
                                            label="Discount"
                                            variant="outlined"
                                            name='discount'
                                            type='number'
                                            value={formData.discount}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />

                                    </Grid>
                                </Grid>
                            </Item>

                        </Grid>
                        <Grid display={'flex'} alignItems={'center'} justifyContent={'center'} item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid >
                </form>
                <Footer />
            </Box >

        </Box>
    );
}
