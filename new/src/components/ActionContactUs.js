import { Box, Button, Popover, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import PopupDelete from './PopupDelete';
import PopupStatus from './PopupStatus';
import Constant from '../Config/Color'
import PopupEdit from './PopupEditCategory';
import PopupEditCategory from './PopupEditCategory';
import Console from '../debug_log';
import PopupReply from './PopupReply';
import New from '../pages/New';

function ActionContactUs(props) {
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
            <Box marginBottom={2.5} onClick={handleClick}>
                <New name='Action' />
            </Box>
            <Popover

                sx={{ marginTop: "90px" }}
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
                <Box paddingY={2} display={'flex'} flexDirection={'column'}>

                    <Box paddingX={2} display={'flex'} alignItems={'center'} gap={1} sx={{ '&:hover': { backgroundColor: 'lightgray' } }}>
                        {props.deleteIcon}
                        <PopupDelete render={props.render} setRender={props.setRender} setAnchorEl={setAnchorEl} delete_flag={props.delete_flag} button={props.delete} id={props.id} url={props.url} setShow={props.setShow} />
                    </Box>


                    <Box paddingX={2} display={'flex'} alignItems={'center'} gap={1} sx={{ '&:hover': { backgroundColor: 'lightgray' } }}>
                        {props.replyIcon}
                        {<PopupReply render={props.render} setRender={props.setRender} setAnchorEl={setAnchorEl} button={props.reply} setShow1={props.setShow1} id={props.id} />}
                    </Box>
                </Box>

            </Popover>
        </Box>

    );
}

export default ActionContactUs;
