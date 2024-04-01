import { Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../Images/logo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useNavigate } from 'react-router-dom';
import profile1 from '../Images/profile1.jpg'
const Navbar = (props) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseUserMenu1 = () => {
        setAnchorElUser(null);
        navigate('/profilePage')

    };


    const handleCloseUserMenu3 = () => {
        setAnchorElUser(null);
        navigate('/home')
    };

    const handleCloseUserMenu4 = () => {
        setAnchorElUser(null);
        navigate('/')
    };
    const handleDrawer = () => {
        props.open === false ? props.setOpen(true) : props.setOpen(false)
    };

    const navigate = useNavigate();


    return (
        <Box height={70} sx={{ backgroundColor: '#212121' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton

                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawer}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(props.open && { display: 'block' }),
                    }}
                >
                    <MenuIcon fontSize='large' sx={{ marginTop: '10px' }} />
                </IconButton>
                <Box onClick={handleOpenUserMenu} marginTop={1} display={'flex'} alignItems={'center'}>
                    <img width={40} style={{ borderRadius: "15px" }} src={profile1} alt='logo' />
                    <Typography marginLeft={1} fontSize={18}>
                        Clarity Clone
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
                        <MenuItem onClick={handleCloseUserMenu1}>
                            <AccountCircleIcon sx={{ color: 'gray', marginRight: '5px' }} />
                            <Typography textAlign="center">Profile</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu3}>
                            <HomeIcon sx={{ color: 'gray', marginRight: '5px' }} />
                            <Typography textAlign="center">Dashboard</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu4}>
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
