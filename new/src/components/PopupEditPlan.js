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
import New from '../pages/New';

const PopupEditPlan = (props) => {

    const navigate = useNavigate()
    const [plan, setPlan] = React.useState(props.title);
    const [message, setMessage] = React.useState('');
    const [open, setOpen] = React.useState(false)
    const [error1, setError1] = useState('');

    const handleEdit = (event) => {
        event.preventDefault();

        if (plan !== '') {
            setError1('')
        }
        if (plan === '') {
            setError1(`Please enter ${props.editText}`)
            return
        }
        if (plan !== '') {

            try {

                const data = {
                    action: 'edit_Plan',
                    plan_id: props.id,
                    title: plan
                }
                Console("data", data)

                axios.post(`${Url}/${props.url}`, data)
                    .then(obj => {
                        const res = obj.data;
                        console.log("res", res.success)
                        if (res.success) {
                            props.setShow1(true)
                            setOpen(false)
                            props.setAnchorEl(null);
                            props.render ? props.setRender(false) : props.setRender(true)
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
            <Button onClick={() => setOpen(true)} color="primary" >
                {props.button}
            </Button>
            {

                <Dialog onClose={() => setOpen(false)} open={open} maxWidth="lg">
                    <Box marginX={2} margin={1} border='3px solid gray' borderRadius={'10px'} display={'flex'} flexDirection={'column'} sx={{ width: { xs: '300px', md: '600px' }, height: '220px' }} paddingLeft={{ xs: 5, md: 15 }} paddingRight={{ xs: 5, md: 25 }} paddingTop={{ xs: 2, md: 4 }} >
                        <Typography marginBottom={2} fontSize={20} color={'gray'}>{props.button}</Typography>

                        <TextField
                            label="Plan"
                            variant="outlined"
                            error={error1}
                            helperText={error1}
                            sx={{ marginTop: '10px', marginBottom: '20px', width: '100%' }}
                            value={plan}
                            onChange={(e) => setPlan(e.target.value)}
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
                            <Box marginBottom={7} onClick={handleEdit}>
                                <New name='Update' />
                            </Box>
                        </Box>
                    </Box>

                </Dialog>
            }

        </Box>
    );
};

export default PopupEditPlan;
