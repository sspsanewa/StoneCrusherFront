
import circle from '../Images/circle.svg'
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Alert, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PopupStatus = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleStatus = async (id, url, status) => {

        if (status === 1) status = 0
        else status = 1
        console.log('id', id)
        try {
            await axios.put(`http://localhost:5000/${url}/` + id, { status, id })
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Box>
            <Box variant="contained" color="primary" onClick={handleOpen}>
                {props.button}
            </Box>

            <Dialog open={open} onClose={handleClose} maxWidth="xs">
                <Box border={2} borderColor='#2196f3' borderRadius='5px' padding={5} display='block' justifyContent='center'>
                    <Box marginLeft='30%'>
                        <img width={50} src={circle} alt='circle' />
                    </Box>
                    <Typography sx={{ p: 2 }}>
                        Are you sure ?<br />
                        Want to {props.status === 1 ? 'Deactivate' : 'Activate'} ?
                    </Typography>

                    <Box gap={2} display='flex'>
                        <Button onClick={() => setOpen(false)} sx={{ bgcolor: 'gray' }} size='small' variant="contained">Cancel</Button>
                        <Button onClick={(e) => { handleStatus(props.id, props.url, props.status); setOpen(false) }} size='small' variant="contained">{props.status === 1 ? 'Deactivate' : 'Activate'}</Button>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
};

export default PopupStatus;
// document.getElementById('alertDelete').style.display = 'block'; setOpen(false) 