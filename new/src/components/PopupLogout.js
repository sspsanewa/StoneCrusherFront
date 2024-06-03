
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Alert, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Constant from '../Config/Color'

const PopupLogout = (props) => {
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

        // try {
        //     await axios.delete(`http://localhost:5000/${url}/` + id)
        //     navigate(props.navPath)
        // } catch (err) {
        //     console.log(err)
        // }
        props.setShow(true)
    }
    return (
        <Box>

            <Box variant="contained" color="primary" onClick={handleOpen}>
                {props.button}
            </Box>

            <Dialog open={open} onClose={handleClose} maxWidth="xs">
                <Box border={2} borderColor={Constant.color[0]} borderRadius='7px' padding={5} display='block' alignItems={'center'} justifyContent='center'>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <DeleteOutlineIcon sx={{ fontSize: '80px', color: Constant.color[0] }} />
                    </Box>
                    <Typography sx={{ p: 2 }}>
                        Are you sure ?<br />
                        Want to Logout ?
                    </Typography>

                    <Box gap={2} display='flex'>
                        <Button onClick={() => setOpen(false)} size='small' variant="outlined" sx={{ borderColor: Constant.color[0], color: Constant.color[0] }}>Cancel</Button>
                        <Button color="primary" onClick={(e) => {
                            handleDelete(props.id, props.url); setOpen(false);
                        }} size='small' variant="contained" style={{ backgroundColor: Constant.color[0] }}>ok</Button>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
};

export default PopupLogout;
// document.getElementById('alertDelete').style.display = 'block'; setOpen(false) 