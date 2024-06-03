import { Box, Stack } from '@mui/material'
import React from 'react'
import logo from '../assets/logo.png'
import Constant from '../Config/Color'
import EastIcon from '@mui/icons-material/East';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
const Logo = (props) => {
    return (
        <Stack style={{ background: Constant.color[2] }}
            display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ width: '100%', maxWidth: 270 }}>
            <Box marginX={10} >
                <img style={{ marginTop: '5px' }} width={60} src={logo} alt='logo' />
            </Box>
            <Box display={{ xs: 'block', md: 'none' }} onClick={() => { props.open ? props.setOpen(false) : props.setOpen(true) }} >
                {props.open ? <KeyboardBackspaceIcon sx={{ fontSize: '45px', color: '#ffffff' }} /> : <EastIcon sx={{ fontSize: '45px', color: '#ffffff' }} />}
            </Box>
        </Stack>
    )
}

export default Logo
