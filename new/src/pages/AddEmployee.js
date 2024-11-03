//Add detail

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import Date from '../components/DateAdd';
import Constant from '../Config/Color';
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import Swal from 'sweetalert2';
import Url from '../Config/Url';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function AddEmployee() {
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [formData, setFormData] = useState({
        employeeId: '',
        employeeFirstName: '',
        employeeLastName: '',
        dateOfJoining: '',
        employeeVillage: '',
        employeeAddress: '',
        employeeMobile: '',
        employeeAadharcard: '',
        employeeSalary: '',
        employeeType: ''
    });


    // if (formData.employeeSalary !== '') {
    //     formData.employeeSalary = parseDouble(formData.employeeSalary);
    // }
    formData.dateOfJoining = dateOfJoining;

    //formData.amount = formData.cubicMeter * formData.rate
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (index !== undefined) {
            const newMaterials = [...formData.materials];
            newMaterials[index][name] = value;

            // // Calculate amount for the material when cubicMeter or rate changes
            // if (name === 'cubicMeter' || name === 'rate') {
            //     const cubicMeter = parseFloat(newMaterials[index]['cubicMeter']);
            //     const rate = parseFloat(newMaterials[index]['rate']);
            //     newMaterials[index]['amount'] = isNaN(cubicMeter) || isNaN(rate) ? '' : cubicMeter * rate;
            // }

            setFormData({
                ...formData,
                materials: newMaterials
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
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

    const [loading, setLoading] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);

        setLoading(true);

        // const totalMaterialAmount = formData.materials.reduce((total, material) => {
        //     // Calculate amount for current material
        //     const amountForMaterial = parseFloat(material.cubicMeter) * parseFloat(material.rate);
        //     // Add the amount to the total
        //     return total + amountForMaterial;
        // }, 0);



        // // Update the totalAmount in the formData
        // const updatedFormData = {
        //     ...formData,
        //     totalAmount: totalMaterialAmount
        // };

        // Set the updated form data
        // setFormData(updatedFormData);
        axios.post(`${Url}/api/v1/employee`, formData)
            .then(res => {
                if (res.status === 200) {
                    setLoading(false);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Expense added successfully.',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false
                    })
                        .then(res => {
                            navigate(`/${APP_PREFIX_PATH}/employeelist`);
                        });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const navigate = useNavigate();
    console.log("formdata", formData);
    return (
        <Box paddingY={4} paddingX={8} marginBottom={10} >

            <Box marginBottom={2} gap={1} display={'flex'}>
                <Button sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/dashboard`)}  >
                    Dashboard
                </Button>

                <Typography marginTop={1.2} fontSize={20} >/</Typography>

                <Typography marginTop={1} sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/clientlist`)}>Employee</Typography>
                <Typography marginTop={1.2} fontSize={20} >/</Typography>

                <Typography marginTop={1.2} fontSize={20} >Add Employee</Typography>
            </Box>

            <Box sx={{ flexGrow: 1, bgcolor: Constant.color[1], padding: '5px', borderRadius: '10px' }}>
                <form onSubmit={handleSubmit}>
                    <Grid marginY={5} item xs={12} md={12} marginTop={2}>
                        <Item sx={{ borderRadius: '10px', margin: '30px' }}>
                            <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={20}><b>Employee Information</b></Typography>
                            <Grid padding={1} item md={12} display={'flex'} container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        required
                                        label="Employee Id"
                                        variant="outlined"
                                        name='employeeId'
                                        value={formData.employeeId}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        required
                                        label="First Name"
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
                                        label="Last Name"
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
                                        required
                                        label="Village"
                                        variant="outlined"
                                        name='employeeVillage'
                                        value={formData.employeeVillage}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid marginTop={1} item xs={12} md={4}>

                                    <Date date={dateOfJoining} setDate={setDateOfJoining} />
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
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        required
                                        label="Mobile Number"
                                        variant="outlined"
                                        name='employeeMobile'
                                        value={formData.employeeMobile}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        type='number'
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        required
                                        label="AadharCard Number"
                                        variant="outlined"
                                        name='employeeAadharcard'
                                        value={formData.employeeAadharcard}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        type='number'
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Salary"
                                        variant="outlined"
                                        name='employeeSalary'
                                        value={formData.employeeSalary}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        type='number'
                                    />
                                </Grid>
                                <Grid marginTop={2} item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-autowidth-label">Employee type</InputLabel>
                                        <Select
                                            required
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            name='employeeType'
                                            value={formData.employeeType}
                                            onChange={(e) => handleChange(e)} // Ensure to pass the event directly
                                            autoWidth
                                            label="Employee Type"
                                        >
                                            <MenuItem value='Labour'>Labour</MenuItem>
                                            <MenuItem value='Manager'>Manager</MenuItem>
                                            <MenuItem value='Driver'>Driver</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {formData.employeeType === '' && <FormHelperText>This field is required.</FormHelperText>}
                                </Grid>

                            </Grid>
                        </Item>
                    </Grid>
                    <Box marginY={5} display={'flex'} alignItems={'center'} justifyContent={'center'} >
                        <Button size='small' type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box >
        </Box >
    );
}