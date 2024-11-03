import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import Constant from '../Config/Color';
import gif from '../assets/gif.webp';
import New from '../pages/New';
import Loader from './Loader';
const Popup = (props) => {
    const [open, setOpen] = useState(true);



    const navigate = useNavigate();



    return (
        <Box>
            {props.button}
            {
                props.show &&
                <Dialog onClose={() => setOpen(false)} open={open} maxWidth="xs">
                    <Box padding={15} style={{ textAlign: 'center' }}>


                        < Loader />

                        <Typography fontSize={20}><b>{props.button}</b></Typography>
                        <Typography fontSize={15} variant="body1">{props.message}</Typography>
                    </Box>

                </Dialog>
            }

        </Box>
    );
};

export default Popup;
