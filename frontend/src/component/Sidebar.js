import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Box, Typography } from '@mui/material';
import ListOfItem from './ListOfItem';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import MoneyIcon from '@mui/icons-material/Money';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import UserList from './UserList';
import Dashboard from './Dashboard';
import AddDetail from './AddDetail';
import Bill from './Bill';

export default function Sidebar(props) {
    const [open1, setOpen1] = React.useState(false);

    const handleClick1 = () => {
        setOpen1(!open1);
    };
    const [open2, setOpen2] = React.useState(false);

    const handleClick2 = () => {
        setOpen2(!open2);
    };
    const [open3, setOpen3] = React.useState(false);

    const handleClick3 = () => {
        setOpen3(!open3);
    };
    const [open4, setOpen4] = React.useState(false);

    const handleClick4 = () => {
        setOpen4(!open4);
    };

    const [hover1, setHover1] = React.useState(false);
    const [hover2, setHover2] = React.useState(false);
    const [hover3, setHover3] = React.useState(false);
    const [hover4, setHover4] = React.useState(false);
    const [hover5, setHover5] = React.useState(false);
    const [hover6, setHover6] = React.useState(false);
    const [hover7, setHover7] = React.useState(false);
    const [hover8, setHover8] = React.useState(false);
    const [hover9, setHover9] = React.useState(false);
    const [hover10, setHover10] = React.useState(false);
    const [hover11, setHover11] = React.useState(false);
    const [hover12, setHover12] = React.useState(false);
    const [hover13, setHover13] = React.useState(false);




    const handleMouseOver1 = () => {
        setHover1(true);
    };
    const handleMouseOver2 = () => {
        setHover2(true);
    };
    const handleMouseOver3 = () => {
        setHover3(true);
    };
    const handleMouseOver4 = () => {
        setHover4(true);
    };
    const handleMouseOver5 = () => {
        setHover5(true);
    };
    const handleMouseOver6 = () => {
        setHover6(true);
    };
    const handleMouseOver7 = () => {
        setHover7(true);
    };
    const handleMouseOver8 = () => {
        setHover8(true);
    };
    const handleMouseOver9 = () => {
        setHover9(true);
    };
    const handleMouseOver10 = () => {
        setHover10(true);
    };
    const handleMouseOver11 = () => {
        setHover11(true);
    };
    const handleMouseOver12 = () => {
        setHover12(true);
    };
    const handleMouseOver13 = () => {
        setHover13(true);
    };

    const handleMouseOut1 = () => {
        setHover1(false);
    };
    const handleMouseOut2 = () => {
        setHover2(false);
    };
    const handleMouseOut3 = () => {
        setHover3(false);
    };
    const handleMouseOut4 = () => {
        setHover4(false);
    };
    const handleMouseOut5 = () => {
        setHover5(false);
    };
    const handleMouseOut6 = () => {
        setHover6(false);
    };
    const handleMouseOut7 = () => {
        setHover7(false);
    };
    const handleMouseOut8 = () => {
        setHover8(false);
    };
    const handleMouseOut9 = () => {
        setHover9(false);
    };
    const handleMouseOut10 = () => {
        setHover10(false);
    };
    const handleMouseOut11 = () => {
        setHover11(false);
    };
    const handleMouseOut12 = () => {
        setHover12(false);
    };
    const handleMouseOut13 = () => {
        setHover13(false);
    };


    const navigate = useNavigate()

    return (
        <Box >
            <Logo />
            <List

                sx={{ width: '100%', maxWidth: 360 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >

                <ListOfItem
                    name='Dashboard'
                    handleMouseOver={handleMouseOver1}
                    handleMouseOut={handleMouseOut1}
                    hover={hover1}
                    path='/dashboard'

                    icon={<DashboardIcon sx={{ color: hover1 ? 'black' : 'white', fontSize: '17px' }} />}
                />

                <ListItemButton
                    sx={{ backgroundColor: hover2 ? 'white' : 'black' }}
                    onClick={handleClick1} onMouseOver={handleMouseOver2} onMouseOut={handleMouseOut2}>
                    <ListItemIcon>
                        <GroupsIcon sx={{ color: hover2 ? 'black' : 'white', fontSize: '17px' }} />
                    </ListItemIcon>
                    <ListItemText sx={{ color: hover2 ? 'black' : 'white' }}
                        primary={
                            <Typography variant="body1" sx={{ color: hover2 ? 'black' : 'white', fontSize: '15px' }}  >
                                Manage User
                            </Typography>
                        }
                    />
                    {open1 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open1} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            onClick={() => { navigate('/userList'); }}
                            onMouseOver={handleMouseOver2} onMouseOut={handleMouseOut2}
                            sx={{ pl: 4, backgroundColor: hover2 ? 'white' : 'black' }}>
                            <ListItemIcon>
                                <ArrowLeftIcon sx={{ color: hover2 ? 'black' : 'white', fontSize: '17px' }} />
                            </ListItemIcon>
                            <ListItemText sx={{ color: hover2 ? 'black' : 'white' }}
                                primary={
                                    <Typography variant="body1" sx={{ color: hover2 ? 'black' : 'white', fontSize: '15px' }}  >
                                        Client List
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                        <ListItemButton
                            onClick={() => { navigate('/addClient'); }}
                            onMouseOver={handleMouseOver2} onMouseOut={handleMouseOut2}
                            sx={{ pl: 4, backgroundColor: hover2 ? 'white' : 'black' }}>
                            <ListItemIcon>
                                <ArrowLeftIcon sx={{ color: hover2 ? 'black' : 'white', fontSize: '17px' }} />
                            </ListItemIcon>
                            <ListItemText sx={{ color: hover2 ? 'black' : 'white' }}
                                primary={
                                    <Typography variant="body1" sx={{ color: hover2 ? 'black' : 'white', fontSize: '15px' }}  >
                                        Add Client
                                    </Typography>
                                }
                            />
                        </ListItemButton>

                    </List>
                </Collapse>




                <ListOfItem
                    path='/addEmployee'
                    name='Add Employee'
                    handleMouseOver={handleMouseOver4}
                    handleMouseOut={handleMouseOut4}
                    hover={hover4}
                    icon={<MoneyIcon sx={{ color: hover4 ? 'black' : 'white', fontSize: '17px' }} />}
                />

                <ListOfItem
                    path='/addVehicle'
                    name='Add Vehicle'
                    handleMouseOver={handleMouseOver4}
                    handleMouseOut={handleMouseOut4}
                    hover={hover4}
                    icon={<MoneyIcon sx={{ color: hover4 ? 'black' : 'white', fontSize: '17px' }} />}
                />








            </List>
        </Box>
    );
}
