
import circle from '../Images/circle.svg'
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Alert, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PopupDelete = (props) => {
    const [open, setOpen] = useState(false);
    const [student, setStudent] = React.useState([])
    const navigate = useNavigate()
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (id, url) => {

        try {
            await axios.delete(`http://localhost:5000/${url}/` + id)
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
                        Want to Delete ?
                    </Typography>

                    <Box gap={2} display='flex'>
                        <Button onClick={() => setOpen(false)} sx={{ bgcolor: 'gray' }} size='small' variant="contained">Cancel</Button>
                        <Button onClick={(e) => { handleDelete(props.id, props.url); setOpen(false) }} size='small' variant="contained">ok</Button>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
};

export default PopupDelete;
// document.getElementById('alertDelete').style.display = 'block'; setOpen(false) 