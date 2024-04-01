import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';
import Footer from '../component/Footer';
import Dashboard from '../component/Dashboard'
import Constant from '../config/Constant'
import UserList from '../component/UserList';

const drawerWidth = 260;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,
    [theme.breakpoints.up('md')]: {
        width: `calc(${theme.spacing(8)} + 10px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Home() {
    const [open, setOpen] = useState(true);
    const [component, setComponent] = useState(<Dashboard />)




    return (
        <Box marginLeft={1} marginRight={1} sx={{ display: 'flex', overflow: 'hidden' }}>
            <CssBaseline />
            <AppBar open={open}>
                <Navbar open={open} setOpen={setOpen} />
            </AppBar>

            <Drawer sx={{ position: { xs: 'absolute', md: 'initial' }, left: '0', top: '0' }} variant="permanent" open={open}>
                <Sidebar component={component} setComponent={setComponent} />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: .1, bgcolor: Constant.color[0], overflowY: 'auto', height: { xs: '200vh', md: '100vh' } }}>
                <DrawerHeader />
                <Box margin={4} marginBottom={20}>
                    {component}
                </Box>
                <Footer />
            </Box>
        </Box>
    );
}