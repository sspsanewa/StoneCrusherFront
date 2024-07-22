import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Grid, styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import Constant from '../Config/Color';
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import DateEdit from '../components/DateEdit';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function EditExpense() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        expenseType: '',
        expenseDescription: '',
        expensePerson: '',
        expenseAmount: '',
        expenseDate: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/expense/${id}`)
            .then(response => {
                const res = response.data;
                setFormData(res);
            })
            .catch(err => console.error("Error fetching expense data:", err));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/v1/expense', formData)
            .then(res => {
                navigate(`/${APP_PREFIX_PATH}/expenselist`);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const navigate = useNavigate();

    return (
        <Box paddingY={4} paddingX={8} marginBottom={10} >
            <Box marginBottom={2} gap={1} display={'flex'}>
                <Button sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/dashboard`)}>
                    Dashboard
                </Button>
                <Typography marginTop={1.2} fontSize={20}>/</Typography>
                <Typography sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/clientlist`)}>Employee</Typography>
                <Typography marginTop={1.2} fontSize={20}>/</Typography>
                <Typography marginTop={1.2} fontSize={20}>Add Employee</Typography>
            </Box>
            <Box sx={{ flexGrow: 1, bgcolor: Constant.color[1], padding: '5px', borderRadius: '10px' }}>
                <form onSubmit={handleSubmit}>
                    <Grid marginY={5} item xs={12} md={12} marginTop={2}>
                        <Item sx={{ borderRadius: '10px', margin: '30px' }}>
                            <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={20}><b>Employee Information</b></Typography>
                            <Grid padding={1} item md={12} display={'flex'} container spacing={2}>
                                <Grid marginTop={2} item xs={12} md={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-autowidth-label">Expense type</InputLabel>
                                        <Select
                                            required
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            name='expenseType'
                                            value={formData.expenseType}
                                            onChange={handleChange}
                                            autoWidth
                                            label="Expense Type"
                                        >
                                            <MenuItem value='Petrol'>Petrol</MenuItem>
                                            <MenuItem value='Disel'>Disel</MenuItem>
                                            <MenuItem value='Chai'>Chai</MenuItem>
                                            <MenuItem value='Tambaku'>Tambaku</MenuItem>
                                            <MenuItem value='Nasta'>Nasta</MenuItem>
                                            <MenuItem value='Other'>Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        required
                                        label="Expense Description"
                                        variant="outlined"
                                        name='expenseDescription'
                                        value={formData.expenseDescription}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Expense Person Name"
                                        variant="outlined"
                                        name='expensePerson'
                                        value={formData.expensePerson}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Expense Amount"
                                        variant="outlined"
                                        name='expenseAmount'
                                        value={formData.expenseAmount}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid marginTop={1} item xs={12} md={4}>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            label="Expense Date"
                                            value={moment(formData.expenseDate)}
                                            onChange={(newValue) => setFormData({ ...formData, expenseDate: newValue.format('YYYY-MM-DD') })}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </Item>
                    </Grid>
                    <Box marginY={5} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Button size='small' type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}
