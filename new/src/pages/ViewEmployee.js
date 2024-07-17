//Add detail

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Date from '../components/Date';
import Constant from '../Config/Color'
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import Console from '../debug_log';
import Url from '../Config/Url';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ViewEmployee() {
    const { id } = useParams();
    const [dateOfJoining, setDateOfJoining] = useState('')
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

    //formData.amount = formData.cubicMeter * formData.rate
    const handleChange = (e, index) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };
    // const addMaterial = () => {
    //     setFormData({
    //         ...formData,
    //         materials: [...formData.materials, { size: '', cubicMeter: '', rate: '', amount: '', vihicle: '', driver: '' }]
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


    React.useEffect(() => {
        const params = { action: 'get_users', delete_flag: 0 };
        Console("users")

        axios.get(`${Url}/api/v1/employee/${id}`, { params })
            .then(obj => {
                const res = obj.data;
                console.log("Users fetched successfully:", res);
                setFormData(res)

            })
            .catch(err => console.error("Error fetching users:", err));
        // .then(err => console.log("eoeee", err))
    }, [])

    const navigate = useNavigate();
    console.log("formdata", formData)
    return (
        <Box paddingY={4} paddingX={8} marginBottom={10} >
            <Box marginBottom={2} gap={1} display={'flex'}>
                <Button sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/dashboard`)}  >
                    Dashboard
                </Button>

                <Typography marginTop={1.2} fontSize={20} >/</Typography>

                <Typography marginTop={1} sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/employeelist`)}>Manage Employees List</Typography>
                <Typography marginTop={1.2} fontSize={20} >/</Typography>

                <Typography marginTop={1.2} fontSize={20} >View Employee</Typography>
            </Box>
            <Box sx={{ flexGrow: 1, bgcolor: Constant.color[1], padding: '5px', borderRadius: '10px' }}>
                <Grid marginY={5} item xs={12} md={12} marginTop={2}>
                    <Item sx={{ borderRadius: '10px', margin: '30px' }}>
                        <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={20}><b>Client Information</b></Typography>
                        <Grid padding={1} item md={12} display={'flex'} container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    required
                                    label="First Name"
                                    variant="filled"
                                    name='firstName'
                                    value={formData.employeeFirstName}
                                    // onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}

                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Last Name"
                                    variant="filled"
                                    name='lastName'
                                    value={formData.employeeLastName}
                                    // onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    required
                                    label="Village"
                                    variant="filled"
                                    name='village'
                                    value={formData.employeeVillage}
                                    // onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid marginTop={1} item xs={12} md={4}>

                                <TextField
                                    required
                                    label="Date of joining"
                                    variant="filled"
                                    name='address'
                                    value={formData.dateOfJoining}
                                    // onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    required
                                    label="Address"
                                    variant="filled"
                                    name='address'
                                    value={formData.employeeAddress}
                                    // onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    required
                                    label="Mobile"
                                    variant="filled"
                                    name='mobile'
                                    value={formData.employeeMobile}
                                    // onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    required
                                    label="AadharCard Number"
                                    variant="filled"
                                    name='employeeAadharcard'
                                    value={formData.employeeAadharcard}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    type='number'
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Salary"
                                    variant="filled"
                                    name='employeeSalary'
                                    value={formData.employeeSalary}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    type='text'
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Employee Type"
                                    variant="filled"
                                    name='employeetype'
                                    value={formData.employeeType}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    type='text'
                                />
                            </Grid>

                        </Grid>
                    </Item>
                </Grid>

                <Box marginY={5} display={'flex'} alignItems={'center'} justifyContent={'center'} >
                    <Button size='small' type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </Box >
        </Box >
    );
}