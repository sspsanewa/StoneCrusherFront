
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
import axios from 'axios';
import Url from '../Config/Url';
import Console from '../debug_log';

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

    const handleDelete = async (id, url, delete_flag) => {
        const data = { action: 'delete_user', user_id: id, delete_flag: delete_flag }

        Console("delete-flag", props.delete_flag)

        try {
            const res = await axios.delete(`${Url}/${url}`, data)
            if (res.data.success) props.setShow(true)
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
                <Box border={2} borderColor={Constant.color[0]} borderRadius='7px' padding={5} display='block' alignItems={'center'} justifyContent='center'>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <DeleteOutlineIcon sx={{ fontSize: '80px', color: Constant.color[0] }} />
                    </Box>
                    <Typography sx={{ p: 2 }}>
                        Are you sure,
                        you want to delete ?
                    </Typography>

                    <Box gap={2} display='flex' justifyContent={'center'}>
                        <Button onClick={() => setOpen(false)} size='small' variant="outlined" sx={{ borderColor: Constant.color[0], color: Constant.color[0] }}>Cancel</Button>
                        <Button color="primary" onClick={(e) => {
                            handleDelete(props.id, props.url, props.delete_flag); setOpen(false);
                        }} size='small' variant="contained" style={{ backgroundColor: Constant.color[0] }}>ok</Button>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
};

export default PopupDelete;
// document.getElementById('alertDelete').style.display = 'block'; setOpen(false) 