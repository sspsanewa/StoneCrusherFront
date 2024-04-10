import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import Date from './date';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function AddDetail() {
    const [date, setDate] = useState('')
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
        cgstAmount: '',
        sgstAmount: '',
        billNumber: '',
        royaltiAmount: '',
        fermName: '',
        paymentMode: '',
        amountCollectedBy: '',
        rate: '',
        amount: '',
        discount: ''

    });

    if (formData.cubicMeter !== '') {
        formData.cubicMeter = parseInt(formData.cubicMeter);
    }
    if (formData.cgstAmount !== '') {
        formData.cgstAmount = parseInt(formData.cgstAmount);
    }
    if (formData.sgstAmount !== '') {
        formData.sgstAmount = parseInt(formData.sgstAmount);
    }
    if (formData.royaltiAmount !== '') {
        formData.royaltiAmount = parseInt(formData.royaltiAmount);
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


    formData.date = date

    console.log("ffff", date)
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };



    formData.amount = formData.cubicMeter * formData.rate
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)
        axios.post('http://localhost:8080/api/v1/client', formData)
            .then(res => {
                navigate('/home')
            })
            .catch(err => {
                console.log(err)
            })
    };
    const navigate = useNavigate()




    return (
        <Box sx={{ width: '100%' }}>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography marginBottom={4} fontSize={20} >Add Detail</Typography>
                <Box display={'flex'}>
                    <Typography onClick={() => navigate('/home')} marginBottom={4} fontSize={15} >Dashboard </Typography>

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

                                        <Date date={date} setDate={setDate} />
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
                                            <InputLabel id="size">Size</InputLabel>
                                            <Select
                                                required
                                                labelId="size"
                                                id="size"
                                                name='size'
                                                value={formData.size}
                                                label="size"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value='20mm'>20mm</MenuItem>
                                                <MenuItem value='10mm'>10mm</MenuItem>
                                                <MenuItem value='4mm(mcend)'>4mm(mcend)</MenuItem>
                                                <MenuItem value='Dust'>Dust</MenuItem>
                                                <MenuItem value='GSB'>Gsb</MenuItem>
                                                <MenuItem value='Wmm'>Wmm</MenuItem>

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
                                            name='cgstAmount'
                                            value={formData.cgstAmount}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />

                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            label="SGST Amount"
                                            variant="outlined"
                                            name='sgstAmount'
                                            value={formData.sgstNumber}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />

                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            label="Royalty Amount"
                                            variant="outlined"
                                            name='royaltiAmount'
                                            value={formData.royaltiAmount}
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
                                            label="Bill Number"
                                            variant="outlined"
                                            name='billNumber'
                                            value={formData.billNumber}
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
                                                name='fermName'
                                                value={formData.fermName}
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
                                                name='amountCollectedBy'
                                                value={formData.amountCollectedBy}
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
                                        {formData.amount === '' && <FormHelperText>This field is required.</FormHelperText>}

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