
import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import BookOnlineIcon from '@mui/icons-material/BookOnline';

import { useLocation, useNavigate } from 'react-router-dom';
import {
    Dashboard as DashboardIcon,
    Person as PersonIcon,
    Logout as LogoutIcon,
    Source as SourceIcon,
    Summarize as SummarizeIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    ArrowLeft as ArrowLeftIcon,
    CellTower as CellTowerIcon,
} from '@mui/icons-material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import GroupsIcon from '@mui/icons-material/Groups';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CallIcon from '@mui/icons-material/Call';
import Logo from './Logo';
import ListOfItem from './ListOfItem';
import Constant from '../Config/Color';
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import './styles.css';
import SchoolIcon from '@mui/icons-material/School';
import InterestsIcon from '@mui/icons-material/Interests';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SubjectIcon from '@mui/icons-material/Subject';
import CategoryIcon from '@mui/icons-material/Category';
export default function Sidebar(props) {
    const [open2, setOpen2] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);

    const location = useLocation();
    console.log('location', location.pathname)
    const [selectedItem, setSelectedItem] = useState('dashboard');
    const [hoveredItem, setHoveredItem] = useState(null);
    const handleItemClick = (item) => {
        setSelectedItem(item);
        navigate(`/${APP_PREFIX_PATH}/${item}`);
    };
    const [hoverStates, setHoverStates] = useState(new Array(16).fill(false));

    const handleHover = (index, value) => {
        setHoverStates((prevState) => {
            const newState = [...prevState];
            newState[index] = value;
            return newState;
        });
    };

    const handleMouseOver = (index) => {
        handleHover(index, true);
    };

    const handleMouseOut = (index) => {
        handleHover(index, false);
    };

    useEffect(() => {
        const path = location.pathname.split('/').pop();
        setSelectedItem(path);
    }, [location]);

    const navigate = useNavigate();
    return (
        <Box bgcolor={Constant.color[0]}
        >
            <Logo open={props.open} setOpen={props.setOpen} />
            <Box sx={{
                width: '100%',
                maxWidth: 270,
                overflow: 'auto',
                height: 'calc(100vh - 60px)',
                className: 'custom-scrollbar' // Adjust height based on your logo height and padding
            }}>
                <List sx={{ width: '100%' }} component="nav" aria-labelledby="nested-list-subheader">
                    <ListItemButton
                        selected={selectedItem === 'dashboard'} // Set selected to true if the selectedItem is 'dashboard'
                        onClick={() => handleItemClick('dashboard')}
                        onMouseEnter={() => setHoveredItem('dashboard')}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{
                            borderRadius: '20px',
                            margin: '5px',
                            background: selectedItem === 'dashboard' ? '#ffffff' : hoveredItem === 'dashboard' ? '#f0f0f0' : Constant.color[2]
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: '40px' }}>
                            <DashboardIcon sx={{
                                color: selectedItem === 'dashboard' ? Constant.color[0] : hoveredItem === 'dashboard' ? 'black' : 'white',
                                fontSize: '22px',
                                transform: selectedItem === 'dashboard' && 'rotate(360deg)', // Rotate the icon if isClicked is true
                                transition: 'transform 1s ease-in-out' // Smooth transition for the rotation
                            }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography variant="body1" sx={{ color: selectedItem === 'dashboard' ? Constant.color[0] : hoveredItem === 'dashboard' ? 'black' : 'white', fontSize: '14px' }}>Dashboard</Typography>}
                        />
                    </ListItemButton>


                    <ListItemButton
                        style={{
                            background: hoverStates[4] ? 'white' : Constant.color[2],
                            borderRadius: '20px',
                            margin: '5px',
                            paddingRight: '30px'
                            , // Adjust padding to reduce gap
                        }}
                        onClick={() => setOpen1(!open1)}
                        onMouseOver={() => handleMouseOver(4)}
                        onMouseOut={() => handleMouseOut(4)}
                    >
                        <ListItemIcon sx={{ minWidth: '40px' }}>
                            <GroupsIcon
                                sx={{ color: hoverStates[4] ? 'black' : 'white', fontSize: '22px' }} />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ color: hoverStates[4] ? 'black' : 'white', marginRight: '8px' }} // Adjust margin to reduce gap
                            primary={
                                <Typography variant="body1" sx={{ color: hoverStates[4] ? 'black' : 'white', fontSize: '14px' }}>
                                    Manage Clients
                                </Typography>
                            }
                        />
                        {open1 ?
                            <ExpandLessIcon sx={{ color: hoverStates[4] ? 'black' : 'white', fontSize: '22px' }} /> :
                            <ExpandMoreIcon sx={{ color: hoverStates[4] ? 'black' : 'white', fontSize: '22px' }} />}
                    </ListItemButton>

                    <Collapse in={open1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton
                                selected={selectedItem === 'clientlist'}
                                onClick={() => handleItemClick('clientlist')}
                                onMouseEnter={() => setHoveredItem('clientlist')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    borderRadius: '20px',
                                    margin: '5px',
                                    paddingLeft: 30, background: selectedItem === 'clientlist' ? '#ffffff' : hoveredItem === 'clientlist' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                    <ArrowLeftIcon
                                        sx={{
                                            color: selectedItem === 'clientlist' ? Constant.color[0] : hoveredItem === 'clientlist' ? 'black' : 'white',
                                            fontSize: '22px',
                                            transform: selectedItem === 'clientlist' && 'rotate(360deg)', // Rotate the icon if isClicked is true
                                            transition: 'transform 1s ease-in-out' // Smooth transition for the rotation
                                        }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'clientlist' ? Constant.color[0] : hoveredItem === 'clientlist' ? 'black' : 'white', fontSize: '14px' }}>Clients List</Typography>}
                                />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedItem === 'addclient'}
                                onClick={() => handleItemClick('addclient')}
                                onMouseEnter={() => setHoveredItem('addclient')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    borderRadius: '20px',
                                    margin: '5px',
                                    paddingLeft: 30, background: selectedItem === 'addclient' ? '#ffffff' : hoveredItem === 'addclient' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                    <ArrowLeftIcon
                                        sx={{
                                            color: selectedItem === 'addclient' ? Constant.color[0] : hoveredItem === 'addclient' ? 'black' : 'white',
                                            fontSize: '22px',
                                            transform: selectedItem === 'addclient' && 'rotate(360deg)', // Rotate the icon if isClicked is true
                                            transition: 'transform 1s ease-in-out' // Smooth transition for the rotation
                                        }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'addclient' ? Constant.color[0] : hoveredItem === 'addclient' ? 'black' : 'white', fontSize: '14px' }}>Add Client</Typography>}
                                />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedItem === 'clientTabularReport'}
                                onClick={() => handleItemClick('clientTabularReport')}
                                onMouseEnter={() => setHoveredItem('clientTabularReport')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    borderRadius: '20px',
                                    margin: '5px',
                                    paddingLeft: 30, background: selectedItem === 'clientTabularReport' ? '#ffffff' : hoveredItem === 'clientTabularReport' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                    <ArrowLeftIcon
                                        sx={{
                                            color: selectedItem === 'clientTabularReport' ? Constant.color[0] : hoveredItem === 'clientTabularReport' ? 'black' : 'white',
                                            fontSize: '22px',
                                            transform: selectedItem === 'clientTabularReport' && 'rotate(360deg)', // Rotate the icon if isClicked is true
                                            transition: 'transform 1s ease-in-out' // Smooth transition for the rotation
                                        }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'clientTabularReport' ? Constant.color[0] : hoveredItem === 'clientTabularReport' ? 'black' : 'white', fontSize: '14px' }}>Clients Report</Typography>}
                                />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton
                        style={{
                            background: hoverStates[2] ? 'white' : Constant.color[2], borderRadius: '20px',
                            margin: '5px',
                            paddingRight: '30px'
                        }}
                        // sx={{ backgroundColor: hoverStates[2] ? 'white' : Constant.color[0] }}
                        onClick={() => setOpen4(!open4)}
                        onMouseOver={() => handleMouseOver(2)}
                        onMouseOut={() => handleMouseOut(2)}
                    >
                        <ListItemIcon sx={{ minWidth: '40px' }}>
                            <SchoolIcon
                                sx={{ color: hoverStates[2] ? 'black' : 'white', fontSize: '22px' }} />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ color: hoverStates[2] ? 'black' : 'white', marginRight: '8px' }}
                            primary={
                                <Typography variant="body1" sx={{ color: hoverStates[2] ? 'black' : 'white', fontSize: '14px' }}>
                                    Manage Employees
                                </Typography>
                            }
                        />
                        {open4 ? <ExpandLessIcon sx={{ color: hoverStates[2] ? 'black' : 'white', fontSize: '22px' }} /> : <ExpandMoreIcon sx={{ color: hoverStates[2] ? 'black' : 'white', fontSize: '22px' }} />}
                    </ListItemButton>
                    <Collapse in={open4} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton
                                selected={selectedItem === 'employeelist'}
                                onClick={() => handleItemClick('employeelist')}
                                onMouseEnter={() => setHoveredItem('employeelist')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    borderRadius: '20px',
                                    margin: '5px',
                                    paddingLeft: 30, background: selectedItem === 'employeelist' ? '#ffffff' : hoveredItem === 'employeelist' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                    <ArrowLeftIcon
                                        sx={{
                                            color: selectedItem === 'employeelist' ? Constant.color[0] : hoveredItem === 'employeelist' ? 'black' : 'white',
                                            fontSize: '22px',
                                            transform: selectedItem === 'employeelist' && 'rotate(360deg)', // Rotate the icon if isClicked is true
                                            transition: 'transform 1s ease-in-out' // Smooth transition for the rotation
                                        }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'employeelist' ? Constant.color[0] : hoveredItem === 'employeelist' ? 'black' : 'white', fontSize: '14px' }}>Employees List</Typography>}
                                />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedItem === 'addemployee'}
                                onClick={() => handleItemClick('addemployee')}
                                onMouseEnter={() => setHoveredItem('addemployee')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    borderRadius: '20px',
                                    margin: '5px',
                                    paddingLeft: 30, background: selectedItem === 'addemployee' ? '#ffffff' : hoveredItem === 'addemployee' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                    <ArrowLeftIcon
                                        sx={{
                                            color: selectedItem === 'addemployee' ? Constant.color[0] : hoveredItem === 'addemployee' ? 'black' : 'white',
                                            fontSize: '22px',
                                            transform: selectedItem === 'addemployee' && 'rotate(360deg)', // Rotate the icon if isClicked is true
                                            transition: 'transform 1s ease-in-out' // Smooth transition for the rotation
                                        }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'addemployee' ? Constant.color[0] : hoveredItem === 'addemployee' ? 'black' : 'white', fontSize: '14px' }}>Add Employee</Typography>}
                                />
                            </ListItemButton>
                        </List>
                    </Collapse>



                    <ListItemButton
                        style={{
                            background: hoverStates[5] ? 'white' : Constant.color[2],
                            borderRadius: '20px',
                            margin: '5px',
                            paddingRight: '30px'
                            // Adjust padding to reduce gap
                        }}
                        onClick={() => setOpen5(!open5)}
                        onMouseOver={() => handleMouseOver(5)}
                        onMouseOut={() => handleMouseOut(5)}
                    >
                        <ListItemIcon sx={{ minWidth: '40px' }}>
                            <EmojiEventsIcon
                                sx={{ color: hoverStates[5] ? 'black' : 'white', fontSize: '22px' }} />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ color: hoverStates[5] ? 'black' : 'white', marginRight: '8px' }} // Adjust margin to reduce gap
                            primary={
                                <Typography variant="body1" sx={{ color: hoverStates[5] ? 'black' : 'white', fontSize: '14px' }}>
                                    Manage Vehicles
                                </Typography>
                            }
                        />
                        {open5 ?
                            <ExpandLessIcon sx={{ color: hoverStates[5] ? 'black' : 'white', fontSize: '22px' }} /> :
                            <ExpandMoreIcon sx={{ color: hoverStates[5] ? 'black' : 'white', fontSize: '22px' }} />}
                    </ListItemButton>

                    <Collapse in={open5} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton
                                selected={selectedItem === 'vehiclelist'}
                                onClick={() => handleItemClick('vehiclelist')}
                                onMouseEnter={() => setHoveredItem('vehiclelist')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    borderRadius: '20px',
                                    margin: '5px',
                                    paddingLeft: 30, background: selectedItem === 'vehiclelist' ? '#ffffff' : hoveredItem === 'vehiclelist' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                    <ArrowLeftIcon
                                        sx={{
                                            color: selectedItem === 'vehiclelist' ? Constant.color[0] : hoveredItem === 'vehiclelist' ? 'black' : 'white',
                                            fontSize: '22px',
                                            transform: selectedItem === 'vehiclelist' && 'rotate(360deg)', // Rotate the icon if isClicked is true
                                            transition: 'transform 1s ease-in-out' // Smooth transition for the rotation
                                        }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'vehiclelist' ? Constant.color[0] : hoveredItem === 'vehiclelist' ? 'black' : 'white', fontSize: '14px' }}>Vehicle List</Typography>}
                                />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedItem === 'addvehicle'}
                                onClick={() => handleItemClick('addvehicle')}
                                onMouseEnter={() => setHoveredItem('addvehicle')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    borderRadius: '20px',
                                    margin: '5px',
                                    paddingLeft: 30, background: selectedItem === 'addvehicle' ? '#ffffff' : hoveredItem === 'addvehicle' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                    <ArrowLeftIcon
                                        sx={{
                                            color: selectedItem === 'addvehicle' ? Constant.color[0] : hoveredItem === 'addvehicle' ? 'black' : 'white',
                                            fontSize: '22px',
                                            transform: selectedItem === 'addvehicle' && 'rotate(360deg)', // Rotate the icon if isClicked is true
                                            transition: 'transform 1s ease-in-out' // Smooth transition for the rotation
                                        }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'addvehicle' ? Constant.color[0] : hoveredItem === 'addvehicle' ? 'black' : 'white', fontSize: '14px' }}>Add Vehicle</Typography>}
                                />
                            </ListItemButton>
                        </List>
                    </Collapse>


                    <ListItemButton
                        style={{
                            background: hoverStates[6] ? 'white' : Constant.color[2],
                            borderRadius: '20px',
                            margin: '6px',
                            paddingRight: '30px'
                            // Adjust padding to reduce gap
                        }}
                        onClick={() => setOpen6(!open6)}
                        onMouseOver={() => handleMouseOver(6)}
                        onMouseOut={() => handleMouseOut(6)}
                    >
                        <ListItemIcon sx={{ minWidth: '40px' }}>
                            <EmojiEventsIcon
                                sx={{ color: hoverStates[6] ? 'black' : 'white', fontSize: '22px' }} />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ color: hoverStates[6] ? 'black' : 'white', marginRight: '8px' }} // Adjust margin to reduce gap
                            primary={
                                <Typography variant="body1" sx={{ color: hoverStates[6] ? 'black' : 'white', fontSize: '14px' }}>
                                    Manage Expenses
                                </Typography>
                            }
                        />
                        {open6 ?
                            <ExpandLessIcon sx={{ color: hoverStates[6] ? 'black' : 'white', fontSize: '22px' }} /> :
                            <ExpandMoreIcon sx={{ color: hoverStates[6] ? 'black' : 'white', fontSize: '22px' }} />}
                    </ListItemButton>

                    <Collapse in={open6} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton
                                selected={selectedItem === 'expenselist'}
                                onClick={() => handleItemClick('expenselist')}
                                onMouseEnter={() => setHoveredItem('expenselist')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    borderRadius: '20px',
                                    margin: '5px',
                                    paddingLeft: 30, background: selectedItem === 'expenselist' ? '#ffffff' : hoveredItem === 'expenselist' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                    <ArrowLeftIcon
                                        sx={{
                                            color: selectedItem === 'expenselist' ? Constant.color[0] : hoveredItem === 'expenselist' ? 'black' : 'white',
                                            fontSize: '22px',
                                            transform: selectedItem === 'expenselist' && 'rotate(360deg)', // Rotate the icon if isClicked is true
                                            transition: 'transform 1s ease-in-out' // Smooth transition for the rotation
                                        }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'expenselist' ? Constant.color[0] : hoveredItem === 'expenselist' ? 'black' : 'white', fontSize: '14px' }}>Expense List</Typography>}
                                />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedItem === 'addexpense'}
                                onClick={() => handleItemClick('addexpense')}
                                onMouseEnter={() => setHoveredItem('addexpense')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    borderRadius: '20px',
                                    margin: '5px',
                                    paddingLeft: 30, background: selectedItem === 'addexpense' ? '#ffffff' : hoveredItem === 'addexpense' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                    <ArrowLeftIcon
                                        sx={{
                                            color: selectedItem === 'addexpense' ? Constant.color[0] : hoveredItem === 'addexpense' ? 'black' : 'white',
                                            fontSize: '22px',
                                            transform: selectedItem === 'addexpense' && 'rotate(360deg)', // Rotate the icon if isClicked is true
                                            transition: 'transform 1s ease-in-out' // Smooth transition for the rotation
                                        }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'addexpense' ? Constant.color[0] : hoveredItem === 'addexpense' ? 'black' : 'white', fontSize: '14px' }}>Add Expense</Typography>}
                                />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton
                        style={{
                            background: hoverStates[11] ? 'white' : Constant.color[2], borderRadius: '20px',
                            margin: '5px',
                            paddingRight: '30px'

                        }}
                        onClick={() => setOpen2(!open2)}
                        onMouseOver={() => handleMouseOver(11)}
                        onMouseOut={() => handleMouseOut(11)}
                    >
                        <ListItemIcon sx={{ minWidth: '40px' }}>
                            <SummarizeIcon
                                sx={{ color: hoverStates[11] ? 'black' : 'white', fontSize: '22px' }} />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ color: hoverStates[11] ? 'black' : 'white' }}
                            primary={
                                <Typography variant="body1" sx={{ color: hoverStates[11] ? 'black' : 'white', fontSize: '14px' }}>
                                    Tabular Report
                                </Typography>
                            }
                        />
                        {open2 ? <ExpandLessIcon sx={{ color: hoverStates[11] ? 'black' : 'white', fontSize: '22px' }} /> : <ExpandMoreIcon sx={{ color: hoverStates[11] ? 'black' : 'white', fontSize: '22px' }} />}
                    </ListItemButton>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton
                                selected={selectedItem === 'userTabularReport'}
                                onClick={() => handleItemClick('userTabularReport')}
                                onMouseEnter={() => setHoveredItem('userTabularReport')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    borderRadius: '20px',
                                    margin: '5px',
                                    paddingLeft: 30, background: selectedItem === 'userTabularReport' ? '#ffffff' : hoveredItem === 'userTabularReport' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                    <ArrowLeftIcon
                                        sx={{
                                            color: selectedItem === 'userTabularReport' ? Constant.color[0] : hoveredItem === 'userTabularReport' ? 'black' : 'white',
                                            fontSize: '22px',
                                            transform: selectedItem === 'userTabularReport' && 'rotate(360deg)', // Rotate the icon if isClicked is true
                                            transition: 'transform 1s ease-in-out' // Smooth transition for the rotation
                                        }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'userTabularReport' ? Constant.color[0] : hoveredItem === 'userTabularReport' ? 'black' : 'white', fontSize: '14px' }}>Users Tabular Report</Typography>}
                                />
                            </ListItemButton>

                            <ListItemButton
                                selected={selectedItem === 'collegeTabularReport'}
                                onClick={() => handleItemClick('collegeTabularReport')}
                                onMouseEnter={() => setHoveredItem('collegeTabularReport')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    borderRadius: '20px',
                                    margin: '5px',
                                    paddingLeft: 30, background: selectedItem === 'collegeTabularReport' ? '#ffffff' : hoveredItem === 'collegeTabularReport' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                    <ArrowLeftIcon
                                        sx={{
                                            color: selectedItem === 'collegeTabularReport' ? Constant.color[0] : hoveredItem === 'collegeTabularReport' ? 'black' : 'white',
                                            fontSize: '22px',
                                            transform: selectedItem === 'collegeTabularReport' && 'rotate(360deg)', // Rotate the icon if isClicked is true
                                            transition: 'transform 1s ease-in-out' // Smooth transition for the rotation
                                        }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'collegeTabularReport' ? Constant.color[0] : hoveredItem === 'collegeTabularReport' ? 'black' : 'white', fontSize: '14px' }}>Colleges Tabular Report</Typography>}
                                />
                            </ListItemButton>


                            <ListItemButton
                                selected={selectedItem === 'reportEventTabularReport'}
                                onClick={() => handleItemClick('reportEventTabularReport')}
                                onMouseEnter={() => setHoveredItem('reportEventTabularReport')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    borderRadius: '20px',
                                    margin: '5px',
                                    paddingLeft: 30, background: selectedItem === 'reportEventTabularReport' ? '#ffffff' : hoveredItem === 'reportEventTabularReport' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                    <ArrowLeftIcon
                                        sx={{
                                            color: selectedItem === 'reportEventTabularReport' ? Constant.color[0] : hoveredItem === 'reportEventTabularReport' ? 'black' : 'white',
                                            fontSize: '22px',
                                            transform: selectedItem === 'reportEventTabularReport' && 'rotate(360deg)', // Rotate the icon if isClicked is true
                                            transition: 'transform 1s ease-in-out' // Smooth transition for the rotation
                                        }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'reportEventTabularReport' ? Constant.color[0] : hoveredItem === 'reportEventTabularReport' ? 'black' : 'white', fontSize: '14px' }}>Reported Events</Typography>}
                                />
                            </ListItemButton>

                            <ListItemButton
                                selected={selectedItem === 'reportCollegeTabularReport'}
                                onClick={() => handleItemClick('reportCollegeTabularReport')}
                                onMouseEnter={() => setHoveredItem('reportCollegeTabularReport')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    borderRadius: '20px',
                                    margin: '5px',
                                    paddingLeft: 30, background: selectedItem === 'reportCollegeTabularReport' ? '#ffffff' : hoveredItem === 'reportCollegeTabularReport' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                    <ArrowLeftIcon
                                        sx={{
                                            color: selectedItem === 'reportCollegeTabularReport' ? Constant.color[0] : hoveredItem === 'reportCollegeTabularReport' ? 'black' : 'white',
                                            fontSize: '22px',
                                            transform: selectedItem === 'reportCollegeTabularReport' && 'rotate(360deg)', // Rotate the icon if isClicked is true
                                            transition: 'transform 1s ease-in-out' // Smooth transition for the rotation
                                        }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'reportCollegeTabularReport' ? Constant.color[0] : hoveredItem === 'reportCollegeTabularReport' ? 'black' : 'white', fontSize: '14px' }}>Reported Colleges</Typography>}
                                />
                            </ListItemButton>
                        </List>
                    </Collapse>



                    <ListItemButton
                        style={{
                            background: hoverStates[12] ? 'white' : Constant.color[2], borderRadius: '20px',
                            margin: '5px',
                            paddingRight: '30px'

                        }}
                        onClick={() => setOpen3(!open3)}
                        onMouseOver={() => handleMouseOver(12)}
                        onMouseOut={() => handleMouseOut(12)}
                    >
                        <ListItemIcon sx={{ minWidth: '40px' }}>
                            <SummarizeIcon sx={{ color: hoverStates[12] ? 'black' : 'white', fontSize: '22px' }} />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ color: hoverStates[12] ? 'black' : 'white' }}
                            primary={
                                <Typography variant="body1" sx={{ color: hoverStates[12] ? 'black' : 'white', fontSize: '14px' }}>
                                    Analytical Report
                                </Typography>
                            }
                        />
                        {open3 ? <ExpandLessIcon sx={{ color: hoverStates[12] ? 'black' : 'white', fontSize: '22px' }} /> : <ExpandMoreIcon sx={{ color: hoverStates[12] ? 'black' : 'white', fontSize: '22px' }} />}
                    </ListItemButton>
                    <Collapse in={open3} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton
                                selected={selectedItem === 'userAnalyticalReport'}
                                onClick={() => handleItemClick('userAnalyticalReport')}
                                onMouseEnter={() => setHoveredItem('userAnalyticalReport')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    borderRadius: '20px',
                                    margin: '5px',
                                    paddingLeft: 30, background: selectedItem === 'userAnalyticalReport' ? '#ffffff' : hoveredItem === 'userAnalyticalReport' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                    <ArrowLeftIcon
                                        sx={{
                                            color: selectedItem === 'userAnalyticalReport' ? Constant.color[0] : hoveredItem === 'userAnalyticalReport' ? 'black' : 'white',
                                            fontSize: '22px',
                                            transform: selectedItem === 'userAnalyticalReport' ? 'rotate(360deg)' : 'rotate(0deg)', // Rotate the icon if isClicked is true
                                            transition: 'transform 1s ease-in-out' // Smooth transition for the rotation
                                        }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'userAnalyticalReport' ? Constant.color[0] : hoveredItem === 'userAnalyticalReport' ? 'black' : 'white', fontSize: '14px' }}>Users Analytical Report</Typography>}
                                />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedItem === 'collegeAnalyticalReport'}
                                onClick={() => handleItemClick('collegeAnalyticalReport')}
                                onMouseEnter={() => setHoveredItem('collegeAnalyticalReport')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    borderRadius: '20px',
                                    margin: '5px',
                                    paddingLeft: 30, background: selectedItem === 'collegeAnalyticalReport' ? '#ffffff' : hoveredItem === 'collegeAnalyticalReport' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '40px' }}>
                                    <ArrowLeftIcon
                                        sx={{
                                            color: selectedItem === 'collegeAnalyticalReport' ? Constant.color[0] : hoveredItem === 'collegeAnalyticalReport' ? 'black' : 'white',
                                            fontSize: '22px',
                                            transform: selectedItem === 'collegeAnalyticalReport' ? 'rotate(360deg)' : 'rotate(0deg)', // Rotate the icon if isClicked is true
                                            transition: 'transform 1s ease-in-out' // Smooth transition for the rotation
                                        }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'collegeAnalyticalReport' ? Constant.color[0] : hoveredItem === 'collegeAnalyticalReport' ? 'black' : 'white', fontSize: '14px' }}>Colleges Analytical Report</Typography>}
                                />
                            </ListItemButton>



                        </List>
                    </Collapse>
                </List>
            </Box>
        </Box>
    );
}
