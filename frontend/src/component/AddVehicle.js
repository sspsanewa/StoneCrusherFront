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

export default function AddVehicle() {
    const [date, setDate] = useState('')
    const [formData, setFormData] = useState({
        vehicleName: '',
        vehicleType: '',
        vehicleDriverName: '',
        vehicleNumber: '',

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };



    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)
        axios.post('http://localhost:8080/api/v1/vehicle', formData)
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
                                            label="Vehical Name"
                                            variant="outlined"
                                            name='vehicleName'
                                            value={formData.vehicleName}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            label="Vehical Type"
                                            variant="outlined"
                                            name='vehicleType'
                                            value={formData.vehicleType}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            required
                                            label="Vehicle Driver Name"
                                            variant="outlined"
                                            name='vehicleDriverName'
                                            value={formData.vehicleDriverName}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            required
                                            label="Vehicle Number"
                                            variant="outlined"
                                            name='vehicleNumber'
                                            value={formData.vehicleNumber}
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