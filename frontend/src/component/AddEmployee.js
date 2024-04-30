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

export default function AddEmployee() {
    const [date, setDate] = useState('')
    const [formData, setFormData] = useState({
        employeeFirstName: '',
        employeeLastName: '',
        dateOfJoining: '',
        employeeVillage: '',
        employeeAddress: '',
        employeeMobile: '',
        employeeSalary: '',
        employeeAadharcard: '',
        employeeType: ''
        // materials: [{ size: '', cubicMeter: '', rate: '', amount: '' }]
    });



    if (formData.employeeMobile !== '') {
        formData.employeeMobile = parseInt(formData.employeeMobile);
    }
    if (formData.employeeSalary !== '') {
        formData.employeeSalary = parseInt(formData.employeeSalary);
    }
    formData.date = date

    //formData.amount = formData.cubicMeter * formData.rate
    const handleChange = (e) => {

        // const { name, value } = e.target;

        // setFormData({
        //     ...formData,
        //     [name]: value
        // });

    };

    // const addMaterial = () => {
    //     setFormData({
    //         ...formData,
    //         materials: [...formData.materials, { size: '', cubicMeter: '', rate: '', amount: '' }]
    //     });
    // };

    // const removeMaterial = (index) => {
    //     const newMaterials = [...formData.materials];
    //     newMaterials.splice(index, 1);
    //     setFormData({
    //         ...formData,
    //         materials: newMaterials
    //     });
    // };

    // Calculate amount for each material and sum up to get totalAmount



    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);


        // const totalMaterialAmount = formData.materials.reduce((total, material) => {
        //     // Calculate amount for current material
        //     const amountForMaterial = parseFloat(material.cubicMeter) * parseFloat(material.rate);
        //     // Add the amount to the total
        //     return total + amountForMaterial;
        // }, 0);



        // Update the totalAmount in the formData
        // const updatedFormData = {
        //     ...formData,
        //     totalAmount: totalMaterialAmount
        // };

        // Set the updated form data
       // setFormData(updatedFormData);
        axios.post('http://localhost:8080/api/v1/client', formData)
            .then(res => {
                navigate('/userList')
            })
            .catch(err => {
                console.log(err)
            })
    };

    const navigate = useNavigate();
    console.log("formdata", formData)
    return (
        <Box sx={{ width: '100%' }}>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography marginBottom={4} fontSize={20}>Add Detail</Typography>
                <Box display={'flex'}>
                    <Typography onClick={() => navigate('/home')} marginBottom={4} fontSize={15}>Dashboard </Typography>
                </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <form onSubmit={handleSubmit}>
                    <Grid marginY={5} item xs={12} md={12}>
                        <Item sx={{ borderRadius: '10px' }}>
                            <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={20}><b>Client Information</b></Typography>
                            <Grid padding={2} item md={12} display={'flex'} container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        required
                                        label="Employee First Name"
                                        variant="outlined"
                                        name='employeeFirstName'
                                        value={formData.employeeFirstName}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Employee SarName"
                                        variant="outlined"
                                        name='employeeLastName'
                                        value={formData.employeeLastName}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Employee Village"
                                        variant="outlined"
                                        name='employeeVillage'
                                        value={formData.employeeVillage}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        required
                                        label="Address"
                                        variant="outlined"
                                        name='employeeAddress'
                                        value={formData.employeeAddress}
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
                                        label="Employee Village  "
                                        variant="outlined"
                                        name='employeeVillage'
                                        value={formData.employeeVillage}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        required
                                        label="Employee Mobile Number"
                                        variant="outlined"
                                        name='employeeMobile'
                                        value={formData.employeeMobile}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid marginTop={2} item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="collection">Employee Type</InputLabel>
                                        <Select
                                            required
                                            labelId="collection"
                                            id="collection"
                                            name='employeeType'
                                            value={formData.employeeType}
                                            onChange={(e) => handleChange(e)} autoWidth
                                            label="collection"
                                        >

                                            <MenuItem value={'Driver'}>Driver</MenuItem>
                                            <MenuItem value={'Labour'}>Labour</MenuItem>
                                            <MenuItem value={'Munim'}>Munim</MenuItem>
                                            <MenuItem value={'Operator'}>Operator</MenuItem>

                                        </Select>
                                    </FormControl>
                                    {formData.amount === '' && <FormHelperText>This field is required.</FormHelperText>}

                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        required
                                        label="Salary Amount"
                                        variant="outlined"
                                        name='employeeSalary'
                                        type='number'
                                        value={formData.employeeSalary}
                                        onChange={handleChange()}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>


                            </Grid>
                        </Item>
                    </Grid>

                    <Grid marginY={5} display={'flex'} alignItems={'center'} justifyContent={'center'} item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </form>
                <Footer />
            </Box>
        </Box>
    );
}
