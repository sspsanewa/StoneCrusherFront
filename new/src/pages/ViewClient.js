//Add detail

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import Date from '../components/Date';
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

export default function ViewClient() {
    const { id } = useParams();
    const [date, setDate] = useState('')
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        date: '',
        village: '',
        address: '',
        mobile: '',
        gstNumber: '',
        cgstAmount: '',
        sgstAmount: '',
        billNumber: '',
        royaltiAmount: '',
        fermName: '',
        paymentMode: '',
        paymentStatus: '',
        amountCollectedBy: '',
        discount: '',
        totalAmount: '',
        materials: [{ size: '', cubicMeter: '', rate: '', amount: '', vehicle: '', driver: '' }]
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
    formData.date = date

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
        Console("users")

        axios.get(`${Url}/api/v1/client/${id}`, { params })
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
                                    label="First Name"
                                    variant="filled"
                                    name='firstName'
                                    value={formData.firstName}
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
                                    value={formData.lastName}
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
                                    value={formData.village}
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
                                    label="Date"
                                    variant="filled"
                                    name='date'
                                    value={formData.date}
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
                                    label="Address"
                                    variant="filled"
                                    name='address'
                                    value={formData.address}
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
                                    value={formData.mobile}
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
                <Grid marginY={5} container spacing={2}>

                    {formData.materials.map((material, index) => (

                        <Grid item xs={12} md={12} key={index}>

                            <Item sx={{ borderRadius: '10px', margin: '30px' }}>

                                <Grid display={'flex'} marginLeft={'40%'} gap={40} >
                                    <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={20}><b>Material Information</b></Typography>
                                </Grid>
                                <Grid padding={2} item md={12} display={'flex'} container spacing={2}>
                                    {/* <Grid marginTop={2} item xs={12} md={4}>
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
                                    </Grid> */}
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            required
                                            label="Quantity"
                                            variant="filled"
                                            name='qantity'
                                            value={material.quantity}
                                            fullWidth
                                            // onChange={handleChange}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            required
                                            label="size"
                                            variant="filled"
                                            name='size'
                                            value={material.size}
                                            fullWidth
                                            // onChange={handleChange}
                                            InputProps={{
                                                readOnly: true,
                                            }}

                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            required
                                            label="Cubic Meter"
                                            variant="filled"
                                            name='cubicMeter'
                                            value={material.cubicMeter} // Change formData.cubicMeter to material.cubicMeter
                                            onChange={(e) => handleChange(e, index)} // Ensure you pass index for correct material
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}

                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            required
                                            label="Rate"
                                            variant="filled"
                                            name='rate'
                                            type='number'
                                            value={material.rate} // Change formData.rate to material.rate
                                            onChange={(e) => handleChange(e, index)} // Ensure you pass index for correct material
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}

                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            required
                                            label="Amount"
                                            variant="filled"
                                            name='amount'
                                            type='number'
                                            value={material.amount} // Change formData.amount to material.amount
                                            onChange={(e) => handleChange(e, index)} // Ensure you pass index for correct material
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}

                                        />
                                    </Grid>


                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            required
                                            label="Vehicle No."
                                            variant="filled"
                                            name='vehicle'
                                            value={material.vehicle}
                                            // onChange={handleChange}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}

                                        />

                                    </Grid>
                                    <Grid marginTop={2} item xs={12} md={4}>
                                        <TextField
                                            required
                                            label="Driver Name"
                                            variant="filled"
                                            name='driver'
                                            value={material.driver}
                                            fullWidth
                                            // onChange={handleChange}
                                            InputProps={{
                                                readOnly: true,
                                            }}

                                        />
                                    </Grid>
                                </Grid>

                            </Item>
                        </Grid>
                    ))}

                </Grid>
                <Grid marginY={5} item xs={12} md={12}>
                    <Item sx={{ borderRadius: '10px', margin: '30px' }}>
                        <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={20}><b>GST & Loyalti Information</b></Typography>

                        <Grid padding={2} item md={12} display={'flex'} container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="GST Number"
                                    variant="filled"
                                    name='gstNumber'
                                    value={formData.gstNumber}
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
                                    label="CGST Amount"
                                    variant="filled"
                                    name='cgstAmount'
                                    value={formData.cgstAmount}
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
                                    label="SGST Amount"
                                    variant="filled"
                                    name='sgstAmount'
                                    value={formData.sgstAmount}
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
                                    label="Royalty Amount"
                                    variant="filled"
                                    name='royaltiAmount'
                                    value={formData.royaltiAmount}
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
                <Grid marginY={5} item xs={12} md={12}>
                    <Item sx={{ borderRadius: '10px', margin: '30px' }}>
                        <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={20}><b>Paymnet Information</b></Typography>

                        <Grid padding={2} item md={12} display={'flex'} container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    required
                                    label="Bill Number"
                                    variant="filled"
                                    name='billNumber'
                                    value={formData.billNumber}
                                    // onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}

                                />
                            </Grid>
                            {/* <Grid marginTop={2} item xs={12} md={4}>
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
                            </Grid> */}
                            <Grid marginTop={2} item xs={12} md={4}>
                                <TextField
                                    required
                                    label="Firm"
                                    variant="filled"
                                    name='fermName'
                                    value={formData.fermName}
                                    // onChange={handleChange}
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}

                                />
                            </Grid>

                            {/* <Grid marginTop={2} item xs={12} md={4}>
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

                            </Grid> */}
                            <Grid marginTop={2} item xs={12} md={4}>
                                <TextField
                                    required
                                    label="Payment"
                                    variant="filled"
                                    name='Payment Mode'
                                    value={formData.paymentMode}
                                    fullWidth
                                    // onChange={handleChange}
                                    InputProps={{
                                        readOnly: true,
                                    }}

                                />
                            </Grid>
                            {/* <Grid marginTop={2} item xs={12} md={4}>
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

                            </Grid> */}
                            <Grid marginTop={2} item xs={12} md={4}>
                                <TextField
                                    required
                                    label="Amount Collected By"
                                    variant="filled"
                                    name='Payment Mode'
                                    value={formData.amountCollectedBy}
                                    fullWidth
                                    // onChange={handleChange}
                                    InputProps={{
                                        readOnly: true,
                                    }}

                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    required
                                    label="Deposite Amount"
                                    variant="filled"
                                    name='depositeAmount'
                                    type='number'
                                    value={formData.depositeAmount}
                                    onChange={handleChange}
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
                                    label="Discount"
                                    variant="filled"
                                    name='discount'
                                    type='number'
                                    value={formData.discount}
                                    onChange={handleChange}
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
                                    label="Remaining Amount"
                                    variant="filled"
                                    name='remainingAmount'
                                    type='number'
                                    value={formData.remainingAmount}
                                    onChange={handleChange}
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
                                    label="Total Amount"
                                    variant="filled"
                                    name='totalAmount'
                                    type='number'
                                    value={formData.totalAmount}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
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
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    >

                                        <MenuItem value={'OPEN'}>Open</MenuItem>
                                        <MenuItem value={'CLOSED'}>Closed</MenuItem>
                                    </Select>
                                </FormControl>
                                {formData.paymentStatus === '' && <FormHelperText>This field is required.</FormHelperText>}

                            </Grid>s
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