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

const PopupAddCategory = (props) => {

    const navigate = useNavigate()
    const [category, setCategory] = React.useState('');
    const [open, setOpen] = React.useState(false)
    const [error1, setError1] = useState('');

    const handleChange1 = (e) => {
        const { value } = e.target;
        setCategory(value);
        if (category !== '') {
            setError1('')
        }
    }
    const handleAdd = (event) => {
        event.preventDefault();
        if (category === '') {
            setError1('Please enter category')
        } else if (category !== '') {

            try {
                const data = {
                    action: 'Add_category',
                    title: category
                }
                Console("data", data)

                axios.post(`${Url}/manage_controller/add_category`, data)
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
            <Box onClick={() => setOpen(true)} variant="contained" color="primary" >
                {props.button}
            </Box>
            {

                <Dialog onClose={() => setOpen(false)} open={open} maxWidth="lg">
                    <Box marginX={2} margin={1} border='3px solid gray' borderRadius={'10px'} display={'flex'} flexDirection={'column'} sx={{ width: { xs: '300px', md: '600px' }, height: '250px' }} paddingLeft={{ xs: 5, md: 15 }} paddingRight={{ xs: 5, md: 25 }} paddingTop={{ xs: 2, md: 4 }} >
                        <Typography marginBottom={2} fontSize={20} color={'gray'}>{props.button}</Typography>

                        <TextField
                            label="Category"
                            variant="outlined"
                            error={error1}
                            helperText={error1}
                            sx={{ marginTop: '10px', marginBottom: '20px', width: '100%' }}
                            value={category}
                            onChange={handleChange1}
                        />

                        <Box marginTop={2} display={'flex'} justifyContent={'right'} alignItems={'center'}>
                            <Button
                                color="primary"

                                onClick={() => setOpen(false)}
                                sx={{
                                    marginBottom: '5%',
                                    marginRight: '5%',
                                }}
                                size='small'
                                variant='outlined'
                            >
                                Cancel
                            </Button>
                            <Box
                                color="primary"

                                onClick={handleAdd}
                                style={{
                                    marginBottom: '9%',
                                    marginRight: '5%',
                                }}
                                size='small'
                                variant='contained'
                            >
                                <New name='Add' />
                            </Box>
                        </Box>
                    </Box>

                </Dialog>
            }

        </Box>
    );
};

export default PopupAddCategory;
