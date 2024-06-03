
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Alert, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import Constant from '../Config/Color'
// import axios from 'axios';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import Url from '../Config/Url';
import axios from 'axios';
const PopupStatus = (props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleStatus = async (id, url, statusValue) => {


        console.log("status", id, url, statusValue)
        const data = { action: 'user_status', user_id: id, active_flag: statusValue }

        try {
            const res = await axios.post(`${Url}/${url}/`, data)
            if (res.data.success) props.setShow1(true)
            props.setAnchorEl(null);
            props.render ? props.setRender(false) : props.setRender(true)
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <Box>
            <Button color="primary" onClick={handleOpen}>
                {props.button}
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="xs">
                <Box border={2} borderColor={Constant.color[0]} borderRadius='5px' padding={5} display='block' justifyContent='center'>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <AirplanemodeActiveIcon sx={{ fontSize: '80px', color: Constant.color[0] }} />
                    </Box>
                    <Typography sx={{ p: 2 }}>
                        Are you sure,
                        want to {props.statusValue === 1 ? 'deactive' : 'active'} ?
                    </Typography>

                    <Box gap={2} display='flex' justifyContent={'center'}>
                        <Button onClick={() => setOpen(false)} size='small' variant="outlined" sx={{ borderColor: Constant.color[0], color: Constant.color[0] }}>Cancel</Button>
                        <Button color="primary" style={{ backgroundColor: Constant.color[0] }} onClick={(e) => { handleStatus(props.id, props.url, props.statusValue); setOpen(false) }} size='small' variant="contained">{props.statusValue === 1 ? 'Deactivate' : 'Activate'}</Button>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
};

export default PopupStatus;
// document.getElementById('alertDelete').style.display = 'block'; setOpen(false) 