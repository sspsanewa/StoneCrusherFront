import { Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Constant from '../Config/Color'
import Console from '../debug_log';
import Url from '../Config/Url';
import axios from 'axios';
import { APP_PREFIX_PATH, IMAGE_PATH } from '../Config/AppConfig';
const Navbar = (props) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [name, setName] = useState(localStorage.getItem('name')
    )
    const [image, setImage] = useState(localStorage.getItem('image'))
    console.log("lll", name, image)
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseUserMenu1 = () => {
        setAnchorElUser(null);
        navigate(`/${APP_PREFIX_PATH}/profile`)

    };


    const handleCloseUserMenu3 = () => {
        setAnchorElUser(null);
        navigate(`/${APP_PREFIX_PATH}/dashboard`)
    };

    const handleCloseUserMenu4 = () => {
        Console("local clersar")
        setAnchorElUser(null);
        localStorage.clear();
        Console('token after logout', localStorage.getItem('token'))
        navigate(`/${APP_PREFIX_PATH}/`)
    };
    const handleDrawer = () => {
        props.open === false ? props.setOpen(true) : props.setOpen(false)
    };

    const navigate = useNavigate();

    React.useEffect(() => {

        const params = {
            action: 'get_profile', user_id: localStorage.getItem('userId')
        }
        axios.get(`${Url}/auth/profile`, { params })
            .then(obj => {
                const res = obj.data;

                if (props.change) {
                    setName(res.data.user_arr.name)
                    setImage(res.data.user_arr.image)
                } else {
                    setName(res.data.user_arr.name)
                    setImage(res.data.user_arr.image)
                }

            })
            .catch(err => console.log(err))
    }, [props.change])

    return (
        <Box borderRadius={2} height={70} width='100%'>
            <Toolbar style={{ background: Constant.color[0], borderRadius: '5px' }} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton

                    color="black"
                    aria-label="open drawer"
                    onClick={handleDrawer}
                    edge="start"
                    sx={{ marginLeft: '30px' }}
                >
                    <MenuIcon fontSize='large' sx={{ color: '#ffffff', marginTop: '10px' }} />
                </IconButton>
                <Box onClick={handleOpenUserMenu} marginTop={1} display={'flex'} alignItems={'center'}>
                    <img style={{ borderRadius: '100%' }} width={40} src={`${IMAGE_PATH}` + image} alt='logo' />
                    <Typography color={'#ffffff'} marginLeft={1} fontSize={18}>
                        {name}
                    </Typography>
                </Box>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <Box>
                        <MenuItem onClick={handleCloseUserMenu1} sx={{ '&:hover': { backgroundColor: 'lightgray' } }}>
                            <AccountCircleIcon sx={{ color: 'gray', marginRight: '5px' }} />
                            <Typography textAlign="center">Profile</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu3} sx={{ '&:hover': { backgroundColor: 'lightgray' } }} >
                            <HomeIcon sx={{ color: 'gray', marginRight: '5px' }} />
                            <Typography textAlign="center">Dashboard</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu4} sx={{ '&:hover': { backgroundColor: 'lightgray' } }}>
                            <PowerSettingsNewIcon sx={{ color: 'gray', marginRight: '5px' }} />
                            <Typography textAlign="center">Log Out</Typography>
                        </MenuItem>
                    </Box>
                </Menu>

            </Toolbar>
        </Box>
    )
}

export default Navbar
