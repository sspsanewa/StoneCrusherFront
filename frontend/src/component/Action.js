import { Box, Button, Popover, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Bill from '../component/Bill'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
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
                sx={{ marginTop: "85px" }}
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
                    <Box display={'flex'}>
                        <VisibilityIcon />
                        <Typography marginLeft={1} onClick={() => navigate(props.viewPath)}>{props.view}</Typography>
                        {/* 
                        + `${props.id}` */}
                    </Box>
                    <Box display={'flex'}>
                        <DeleteIcon />
                        <Typography marginLeft={1}>{props.delete}</Typography>
                    </Box>
                    <Box display={'flex'}>
                        <EditIcon />
                        <Typography marginLeft={1}>{props.edit}</Typography>
                    </Box>
                    <Box display={'flex'}>
                        <Typography marginLeft={1}>{props.reply}</Typography>
                    </Box>
                    <Box display={'flex'}>
                        <Typography marginLeft={1}>{props.talktime}</Typography>
                    </Box>
                    <Box onClick={() => navigate('/bill')} display={'flex'}>
                        <EditIcon />
                        <Typography marginLeft={1}>Bill</Typography>
                    </Box>

                </Box>
            </Popover>
        </Box>

    );
}

export default Action;
