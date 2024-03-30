import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

const Popup = (props) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate()

    return (
        <Box>
            <Box variant="contained" color="primary" onClick={handleOpen}>
                {props.button}
            </Box>
            {
                props.show &&
                <Dialog open={open} onClose={handleClose} maxWidth="xs">
                    <Box padding={15} style={{ textAlign: 'center' }}>
                        <LoginIcon fontSize='large' sx={{ color: 'green' }} />
                        <Typography fontSize={20}><b>{props.button}</b></Typography>
                        <Typography fontSize={15} variant="body1">{props.message}</Typography>
                    </Box>
                    <Button
                        onClick={() => navigate(props.path)}
                        sx={{
                            position: 'absolute',
                            right: '0',
                            bottom: '0',
                            marginBottom: '20px',
                            marginRight: '20px'
                        }}
                        variant='contained'
                    >
                        Ok
                    </Button>
                </Dialog>
            }

        </Box>
    );
};

export default Popup;
