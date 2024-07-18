import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import Date from '../components/Date';
import Constant from '../Config/Color';
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

export default function ViewExpense() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        expenseType: '',
        expenseDescription: '',
        expensePerson: '',
        expenseAmount: '',
        expenseDate: ''
    });


    console.log("After form declaration");


    useEffect(() => {
        console.log("Entering into the api");
        axios.get(`${Url}/api/v1/expense/${id}`)
            .then(obj => {
                const res = obj.data;
                console.log("Expense fetched successfully:", res);
                setFormData(res);
            })
            .catch(err => console.error("Error fetching expense:", err));
    }, [id]);

    const navigate = useNavigate();

    return (
        <Box paddingY={4} paddingX={8} marginBottom={10} >
            <Box marginBottom={2} gap={1} display={'flex'}>
                <Button sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/dashboard`)}  >
                    Dashboard
                </Button>

                <Typography marginTop={1.2} fontSize={20} >/</Typography>

                <Typography marginTop={1} sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/expenselist`)}>Manage Clients List</Typography>
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
                                    label="Expense Type"
                                    variant="filled"
                                    name='expenseType'
                                    value={formData.expenseType}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Expense Description"
                                    variant="filled"
                                    name='expenseDescription'
                                    value={formData.expenseDescription}
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
                                    label="Expense Persion"
                                    variant="filled"
                                    name='expensePerson'
                                    value={formData.expensePerson}
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
                                    label="Expense Amount"
                                    variant="filled"
                                    name='expenseAmount'
                                    value={formData.expenseAmount}
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
                                    label="Expense Date"
                                    variant="filled"
                                    name='expenseDate'
                                    value={formData.expenseDate}
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
            </Box >
        </Box >
    );
}