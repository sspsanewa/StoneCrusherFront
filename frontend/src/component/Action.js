import { Box, Button, Popover, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Action(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const navigate = useNavigate()
    return (
        <Box>
            <Button sx={{ bgcolor: '#212121' }} size='small' aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                Action
            </Button>
            <Popover
                sx={{ marginTop: "80px" }}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                getContentAnchorEl={null}
            >
                <Box padding={2} display={'flex'} flexDirection={'column'}>
                    <Typography onClick={() => navigate(props.viewPath + `${props.id}`)}>{props.view}                    </Typography>
                    <Typography>{props.delete}</Typography>
                    <Typography> {props.status}</Typography>
                    <Typography>{props.edit}</Typography>
                    <Typography>{props.reply}</Typography>
                    <Typography>  {props.lang}</Typography>
                    <Typography>{props.talktime}</Typography>
                </Box>
            </Popover>
        </Box>

    );
}

export default Action;
