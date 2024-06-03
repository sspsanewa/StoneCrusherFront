import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import Constant from '../Config/Color'
import Url from '../Config/Url'
import axios from 'axios'
import Console from '../debug_log';
import { Description } from '@mui/icons-material';
import New from '../pages/New';

const PopupAddPlan = (props) => {

    const navigate = useNavigate()
    const [plan, setPlan] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [amount, setAmount] = React.useState('');

    const [open, setOpen] = React.useState(false)
    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');
    const [error3, setError3] = useState('');

    const handleChange1 = (e) => {
        const { value } = e.target;
        setPlan(value);
        if (plan !== '') {
            setError1('')
        }
        if (!isNaN(value) && Number(value) >= 0) {
            // Update the state with the valid input value
            setPlan(value);
            setError1(""); // Clear any previous error message
        }
        else {
            // If the input is not a valid number or negative, show an error message
            setError1("GB cannot be negative");
            return
        }
    }


    const handleChange2 = (e) => {
        const { value } = e.target;
        setDescription(value);
        if (description !== '') {
            setError2('')
        }
    }


    const handleChange3 = (e) => {
        const { value } = e.target;
        setAmount(value);
        if (amount !== '') {
            setError3('')
        }
        if (!isNaN(value) && Number(value) >= 0) {
            // Update the state with the valid input value
            setAmount(value);
            setError3(""); // Clear any previous error message
        }
        else {
            // If the input is not a valid number or negative, show an error message
            setError3("Amount cannot be negative");
            return
        }
    }

    const handleAdd = (event) => {
        event.preventDefault();
        if (plan === '') {
            setError1('Please enter plan')
        }
        if (description === '') {
            setError2('Please enter description')
        }
        if (amount === '') {
            setError3('Please enter description')
        }
        if (plan < 0 || amount < 0) {
            return
        }
        else if (plan !== '' && description != '') {

            try {
                const data = {
                    action: 'Add_Plan',
                    title: plan,
                    description: description,
                    amount: amount
                }
                Console("data", data)

                axios.post(`${Url}/manage_controller/add_Plan`, data)
                    .then(obj => {
                        const res = obj.data;
                        console.log("res", res.success)
                        if (res.success) {
                            props.setShow(true)
                            setOpen(false)
                            props.render ? props.setRender(false) : props.setRender(true)
                        } else {
                            props.setShow(true)
                            setOpen(false)
                            props.setMessage(res.msg)
                        }
                    })
                    .catch(err => {
                        Console("error", err)
                    })
            } catch (err) {
                Console("error", err)
            }

        }

    }

    return (

        <Box >
            {/* <Box onClick={() => setOpen(true)} variant="contained" color="primary" >
                {props.button}
            </Box> */}
            <Box onClick={() => setOpen(true)}>
                <New name={props.button} />
            </Box>
            {

                <Dialog onClose={() => setOpen(false)} open={open} maxWidth="lg">
                    <Box marginX={2} margin={1} border='3px solid gray' borderRadius={'10px'} display={'flex'} flexDirection={'column'} sx={{ width: { xs: '300px', md: '600px' }, height: '450px' }} paddingLeft={{ xs: 5, md: 15 }} paddingRight={{ xs: 5, md: 25 }} paddingTop={{ xs: 2, md: 4 }} >
                        <Typography marginBottom={2} fontSize={20} color={'gray'}>{props.button}</Typography>

                        <TextField
                            label="Plan(in gb)"
                            variant="outlined"
                            error={error1}
                            type='number'
                            helperText={error1}
                            sx={{ marginTop: '10px', marginBottom: '20px', width: '100%' }}
                            value={plan}
                            onChange={handleChange1}
                        />

                        <TextField
                            label="Description"
                            variant="outlined"
                            error={error2}
                            type='text'
                            helperText={error2}
                            sx={{ marginTop: '10px', marginBottom: '20px', width: '100%' }}
                            value={description}
                            onChange={handleChange2}
                        />
                        <TextField
                            label="Amount"
                            variant="outlined"
                            error={error3}
                            type='number'
                            helperText={error3}
                            sx={{ marginTop: '10px', marginBottom: '20px', width: '100%' }}
                            value={amount}
                            onChange={handleChange3}
                        />
                        <Box marginTop={2} display={'flex'} justifyContent={'right'} alignItems={'center'}>
                            <Button

                                onClick={() => setOpen(false)}
                                sx={{
                                    marginBottom: '5%',
                                    marginRight: '5%',
                                    color: Constant.color[0],
                                    border: `1px solid ${Constant.color[0]}`
                                }}
                                size='small'
                                variant='outlined'
                            >
                                Cancel
                            </Button>
                            <Box marginBottom={7} onClick={handleAdd}>
                                <New name='ADD' />
                            </Box>
                        </Box>
                    </Box>

                </Dialog>
            }

        </Box>
    );
};

export default PopupAddPlan;
