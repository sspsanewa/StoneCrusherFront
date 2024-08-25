//Add detail

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import "react-datepicker/dist/react-datepicker.css";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import Date from '../components/DateEdit';
import Constant from '../Config/Color'
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import DateEdit from '../components/DateEdit';
import Swal from 'sweetalert2';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function EditClient() {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        date: '',
        village: '',
        address: '',
        mobile: '',
        gstNumber: '',
        cgstAmount: 0,
        sgstAmount: 0,
        billNumber: '',
        royaltiAmount: 0,
        fermName: '',
        paymentMode: '',
        amountCollectedBy: '',
        discount: '',
        depositeAmount: '',
        totalAmount: 0,
        remainingAmount: '',
        materials: [{ quantity: '', size: '', cubicMeter: '', rate: '', amount: '', vehicle: '', driver: '' }]
    });


    if (formData.cgstAmount !== '') {
        formData.cgstAmount = parseInt(formData.cgstAmount);
    }
    if (formData.sgstAmount !== '') {
        formData.sgstAmount = parseInt(formData.sgstAmount);
    }
    if (formData.royaltiAmount !== '') {
        formData.royaltiAmount = parseInt(formData.royaltiAmount);
    }

    if (formData.discount !== '') {
        formData.discount = parseInt(formData.discount);
    }
    if (formData.totalAmount !== '') {
        formData.totalAmount = parseInt(formData.totalAmount);
    }

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
    const addMaterial = () => {
        setFormData({
            ...formData,
            materials: [...formData.materials, { quantity: '', size: '', cubicMeter: '', rate: '', amount: '', vehicle: '', driver: '' }]
        });
    };

    const removeMaterial = (index) => {
        const newMaterials = [...formData.materials];
        newMaterials.splice(index, 1);
        setFormData({
            ...formData,
            materials: newMaterials
        });
    };

    // Calculate amount for each material and sum up to get totalAmount



    React.useEffect(() => {
        const params = { action: 'get_users', delete_flag: 0 };

        axios.get(`http://localhost:8080/api/v1/client/${id}`, { params })

            .then(obj => {
                const res = obj.data;
                console.log("Users fetched successfully:", res);
                setFormData(res)

            })
            .catch(err => console.error("Error fetching users:", err));
        // .then(err => console.log("eoeee", err))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);

        axios.post(`http://localhost:8080/api/v1/client`, formData)
            .then(res => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Client updated successfully.',
                    icon: 'success',
                    timer: 3000,
                    showConfirmButton: false
                })
                    .then(res => {
                        navigate(`/${APP_PREFIX_PATH}/clientlist`)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    };

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

                <Typography marginTop={1.2} fontSize={20} >Edit Client</Typography>
            </Box>
            <Box sx={{ flexGrow: 1, bgcolor: Constant.color[1], padding: '5px', borderRadius: '10px' }}>
                <form onSubmit={handleSubmit}>
                    <Grid marginY={5} item xs={12} md={12} marginTop={2}>
                        <Item sx={{ borderRadius: '10px', margin: '30px' }}>
                            <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={20}><b>Client Information</b></Typography>
                            <Grid padding={1} item md={12} display={'flex'} container spacing={2}>
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
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            label="Date"
                                            value={moment(formData.date)}
                                            onChange={(newValue) => setFormData({ ...formData, date: newValue.format('YYYY-MM-DD') })}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
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
                    <Grid marginY={5} container spacing={2}>

                        {formData.materials.map((material, index) => (

                            <Grid item xs={12} md={12} key={index}>

                                <Item sx={{ borderRadius: '10px', margin: '30px' }}>

                                    <Grid display={'flex'} marginLeft={'40%'} gap={40} >
                                        <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={20}><b>Material Information</b></Typography>
                                        {index != 0 &&
                                            <Box display={'flex'} justifyContent={'center'} >
                                                <Button size='small' onClick={() => removeMaterial(index)} variant="outlined" color="secondary">Remove</Button>
                                            </Box>
                                        }
                                    </Grid>
                                    <Grid padding={2} item md={12} display={'flex'} container spacing={2}>
                                        <Grid marginTop={2} item xs={12} md={4}>
                                            <FormControl fullWidth>
                                                <InputLabel id={`quantity-${index}`}>Quantity</InputLabel>
                                                <Select
                                                    required
                                                    labelId={`quantity-${index}`}
                                                    id={`quantity-${index}`}
                                                    name='quantity'
                                                    value={material.quantity}
                                                    onChange={(e) => handleChange(e, index)}
                                                    label="quantity"
                                                >
                                                    <MenuItem value='1'>1</MenuItem>
                                                    <MenuItem value='2'>2</MenuItem>
                                                    <MenuItem value='3'>3</MenuItem>
                                                    <MenuItem value='4'>4</MenuItem>
                                                    <MenuItem value='5'>5</MenuItem>
                                                    <MenuItem value='6'>6</MenuItem>
                                                    <MenuItem value='7'>7</MenuItem>
                                                    <MenuItem value='8'>8</MenuItem>
                                                    <MenuItem value='9'>9</MenuItem>
                                                    <MenuItem value='10'>10</MenuItem>
                                                    <MenuItem value='11'>11</MenuItem>
                                                    <MenuItem value='12'>12</MenuItem>
                                                    <MenuItem value='13'>13</MenuItem>
                                                    <MenuItem value='14'>14</MenuItem>
                                                    <MenuItem value='15'>15</MenuItem>
                                                    <MenuItem value='16'>16</MenuItem>
                                                    <MenuItem value='17'>17</MenuItem>
                                                    <MenuItem value='18'>18</MenuItem>
                                                    <MenuItem value='19'>19</MenuItem>
                                                    <MenuItem value='20'>20</MenuItem>
                                                </Select>
                                            </FormControl>
                                            {material.size === '' && <FormHelperText>This field is required.</FormHelperText>}
                                        </Grid>
                                        <Grid marginTop={2} item xs={12} md={4}>
                                            <FormControl fullWidth>
                                                <InputLabel id={`size-${index}`}>Size</InputLabel>
                                                <Select
                                                    required
                                                    labelId={`size-${index}`}
                                                    id={`size-${index}`}
                                                    name='size'
                                                    value={material.size}
                                                    onChange={(e) => handleChange(e, index)}
                                                    label="size"
                                                >
                                                    <MenuItem value='40mm'>40mm</MenuItem>
                                                    <MenuItem value='20mm'>20mm</MenuItem>
                                                    <MenuItem value='10mm'>10mm</MenuItem>
                                                    <MenuItem value='4mm(mcend)'>4mm(mcend)</MenuItem>
                                                    <MenuItem value='Dust'>Dust</MenuItem>
                                                    <MenuItem value='GSB'>Gsb</MenuItem>
                                                    <MenuItem value='Wmm'>Wmm</MenuItem>
                                                </Select>
                                            </FormControl>
                                            {material.size === '' && <FormHelperText>This field is required.</FormHelperText>}
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                required
                                                label="Cubic Meter"
                                                variant="outlined"
                                                name='cubicMeter'
                                                value={material.cubicMeter} // Change formData.cubicMeter to material.cubicMeter
                                                onChange={(e) => handleChange(e, index)} // Ensure you pass index for correct material
                                                fullWidth
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                required
                                                label="Rate"
                                                variant="outlined"
                                                name='rate'
                                                type='number'
                                                value={material.rate} // Change formData.rate to material.rate
                                                onChange={(e) => handleChange(e, index)} // Ensure you pass index for correct material
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
                                                value={material.amount} // Change formData.amount to material.amount
                                                onChange={(e) => handleChange(e, index)} // Ensure you pass index for correct material
                                                fullWidth
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                required
                                                label="Vehicle No."
                                                variant="outlined"
                                                name='vehicle'
                                                value={material.vehicle}
                                                onChange={(e) => handleChange(e, index)}
                                                fullWidth
                                                margin="normal"
                                            />

                                        </Grid>
                                        <Grid marginTop={2} item xs={12} md={4}>
                                            <FormControl fullWidth>
                                                <InputLabel id="collection">Driver</InputLabel>
                                                <Select
                                                    required
                                                    labelId="driver"
                                                    id="driver"
                                                    name='driver'
                                                    value={material.driver}
                                                    onChange={(e) => handleChange(e, index)}
                                                    autoWidth
                                                    label="driver"
                                                >
                                                    <MenuItem value={'kamal'}>kamal</MenuItem>
                                                    <MenuItem value={'raj'}>raj</MenuItem>
                                                    <MenuItem value={'jaysing'}>jaysing</MenuItem>
                                                    <MenuItem value={'mohan'}>mohan</MenuItem>
                                                </Select>
                                            </FormControl>
                                            {material.driver === '' && <FormHelperText>This field is required.</FormHelperText>}

                                        </Grid>



                                    </Grid>

                                </Item>
                            </Grid>
                        ))}
                        <Grid display={'flex'} alignItems={'center'} justifyContent={'center'} item xs={12}>
                            <Button size='small' onClick={addMaterial} variant="contained" color="primary">Add More</Button>
                        </Grid>
                    </Grid>
                    <Grid marginY={5} item xs={12} md={12}>
                        <Item sx={{ borderRadius: '10px', margin: '30px' }}>
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
                                        value={formData.sgstAmount}
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
                    <Grid marginY={5} item xs={12} md={12}>
                        <Item sx={{ borderRadius: '10px', margin: '30px' }}>
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
                                            onChange={(e) => handleChange(e)} // Ensure to pass the event directly
                                            autoWidth
                                            label="Firm"
                                        >
                                            <MenuItem value={'Balaji Stone Crusher'}>Balaji Stone Crusher</MenuItem>
                                            <MenuItem value={'Shree Shyam Mining'}>Shree Shyam Mining</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {formData.fermName === '' && <FormHelperText>This field is required.</FormHelperText>}
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
                                            onChange={(e) => handleChange(e)} autoWidth
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
                                            onChange={(e) => handleChange(e)} autoWidth
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
                                        label="Deposite Amount"
                                        variant="outlined"
                                        name='depositeAmount'
                                        type='number'
                                        value={formData.depositeAmount}
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
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        required
                                        label="Remaining Amount"
                                        variant="outlined"
                                        name='remainingAmount'
                                        type='number'
                                        value={formData.remainingAmount}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />

                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        required
                                        label="Total Amount"
                                        variant="outlined"
                                        name='totalAmount'
                                        type='number'
                                        value={formData.totalAmount}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />

                                </Grid>
                                <Grid marginTop={2} item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="pay">Payment Status</InputLabel>
                                        <Select
                                            required
                                            labelId="Payment Status"
                                            id="paymentStatus"
                                            name='paymentStatus'
                                            value={formData.paymentStatus}
                                            onChange={(e) => handleChange(e)} autoWidth
                                            label="Payment"
                                        >

                                            <MenuItem value={'OPEN'}>Open</MenuItem>
                                            <MenuItem value={'CLOSED'}>Closed</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {formData.paymentStatus === '' && <FormHelperText>This field is required.</FormHelperText>}

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