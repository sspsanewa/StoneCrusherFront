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

export default function ViewVehicle() {
    const { id } = useParams();
    const [dateOfJoining, setDateOfJoining] = useState('')
    const [formData, setFormData] = useState({
        vehicleName: '',
        vehicleDriverName: '',
        vehicleNumber: '',
        vehicleType: '',
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

        axios.get(`${Url}/api/v1/vehicle/${id}`, { params })
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

                <Typography marginTop={1} sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/clientlist`)}>Manage Clients List</Typography>
                <Typography marginTop={1.2} fontSize={20} >/</Typography>

                <Typography marginTop={1.2} fontSize={20} >View Client</Typography>
            </Box>
            <Box sx={{ flexGrow: 1, bgcolor: Constant.color[1], padding: '5px', borderRadius: '10px' }}>
                <Grid marginY={5} item xs={12} md={12} marginTop={2}>
                    <Item sx={{ borderRadius: '10px', margin: '30px' }}>
                        <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={20}><b>Client Information</b></Typography>
                        <Grid padding={1} item md={12} display={'flex'} container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    required
                                    label="Driver Name"
                                    variant="filled"
                                    name='vehicleDriverName'
                                    value={formData.vehicleDriverName}
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
                                    label="Vehicle Name"
                                    variant="filled"
                                    name='vehicleName'
                                    value={formData.vehicleName}
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
                                    label="Vehicle Number"
                                    variant="filled"
                                    name='vehicleNumber'
                                    value={formData.vehicleNumber}
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
                                    label="Vehicle Type"
                                    variant="filled"
                                    name='vehicleType'
                                    value={formData.vehicleType}
                                    // onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
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