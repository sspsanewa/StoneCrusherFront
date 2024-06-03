import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import Constant from '../Config/Color'
import gif from '../assets/gif.webp'
import New from '../pages/New';
const Popup = (props) => {
    const [open, setOpen] = useState(true);



    const navigate = useNavigate()

    return (
        <Box>
            {props.button}
            {
                props.show &&
                <Dialog onClose={() => setOpen(false)} open={open} maxWidth="xs">
                    <Box padding={15} style={{ textAlign: 'center' }}>
                        <img width={150} src={gif} alt='gif' />
                        <Typography fontSize={20}><b>{props.button}</b></Typography>
                        <Typography fontSize={15} variant="body1">{props.message}</Typography>
                    </Box>
                    <Box
                        onClick={() => { navigate(props.path); setOpen(false); }}
                        style={{
                            position: 'absolute',
                            right: '0',
                            bottom: '0',
                            marginBottom: '20px',
                            marginRight: '20px',
                        }}

                        variant='contained'
                    >
                        <New name='Ok' />
                    </Box>
                </Dialog>
            }

        </Box>
    );
};

export default Popup;
