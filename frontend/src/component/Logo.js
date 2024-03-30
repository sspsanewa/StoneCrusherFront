import { Box } from '@mui/material'
import React from 'react'
import logo from '../Images/logo.png'
import Constant from '../config/Constant'

const Logo = () => {
    return (
        <Box bgcolor={Constant.color[0]}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} >
                <img width={260} src={logo} alt='logo' />
            </Box>
        </Box>
    )
}

export default Logo
