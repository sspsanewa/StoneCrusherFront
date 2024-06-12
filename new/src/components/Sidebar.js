
import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
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
import CategoryIcon from '@mui/icons-material/Category';
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

export default function Sidebar(props) {
    const [open2, setOpen2] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
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

    const navigate = useNavigate();
    return (
        <Box borderRadius={2} bgcolor={Constant.color[0]} paddingBottom={11}>
            <Logo open={props.open} setOpen={props.setOpen} />
            <Box>
                <List sx={{ width: '100%', maxWidth: 268 }} component="nav" aria-labelledby="nested-list-subheader">
                    <ListItemButton
                        selected={selectedItem === 'dashboard'} // Set selected to true if the selectedItem is 'dashboard'
                        onClick={() => handleItemClick('dashboard')}
                        onMouseEnter={() => setHoveredItem('dashboard')}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{
                            background: selectedItem === 'dashboard' ? '#ffffff' : hoveredItem === 'dashboard' ? '#f0f0f0' : Constant.color[2]
                        }}
                    >
                        <ListItemIcon>
                            <DashboardIcon sx={{ color: selectedItem === 'dashboard' ? 'black' : hoveredItem === 'dashboard' ? 'black' : 'white', fontSize: '20px' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography variant="body1" sx={{ color: selectedItem === 'dashboard' ? 'black' : hoveredItem === 'dashboard' ? 'black' : 'white', fontSize: '15px' }}>Dashboard</Typography>}
                        />
                    </ListItemButton>


                    <ListItemButton
                        style={{ background: hoverStates[4] ? 'white' : Constant.color[2] }}
                        // sx={{ backgroundColor: hoverStates[4] ? 'white' : Constant.color[0] }}
                        onClick={() => setOpen1(!open1)}
                        onMouseOver={() => handleMouseOver(4)}
                        onMouseOut={() => handleMouseOut(4)}
                    >
                        <ListItemIcon>
                            <GroupsIcon sx={{ color: hoverStates[4] ? 'black' : 'white', fontSize: '17px' }} />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ color: hoverStates[4] ? 'black' : 'white' }}
                            primary={
                                <Typography variant="body1" sx={{ color: hoverStates[4] ? 'black' : 'white', fontSize: '15px' }}>
                                    Manage Clients
                                </Typography>
                            }
                        />
                        {open1 ? <ExpandLessIcon sx={{ color: hoverStates[4] ? 'black' : 'white', fontSize: '17px' }} /> : <ExpandMoreIcon sx={{ color: hoverStates[4] ? 'black' : 'white', fontSize: '17px' }} />}
                    </ListItemButton>
                    <Collapse in={open1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton
                                selected={selectedItem === 'clientlist'}
                                onClick={() => handleItemClick('clientlist')}
                                onMouseEnter={() => setHoveredItem('clientlist')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    paddingLeft: 30, background: selectedItem === 'clientlist' ? '#ffffff' : hoveredItem === 'clientlist' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon>
                                    <ArrowLeftIcon sx={{ color: selectedItem === 'clientlist' ? 'black' : hoveredItem === 'clientlist' ? 'black' : 'white', fontSize: '20px' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'clientlist' ? 'black' : hoveredItem === 'clientlist' ? 'black' : 'white', fontSize: '15px' }}>Clients List</Typography>}
                                />
                            </ListItemButton>


                            <ListItemButton
                                selected={selectedItem === 'deletedclientlist'}
                                onClick={() => handleItemClick('deletedclientlist')}
                                onMouseEnter={() => setHoveredItem('deletedclientlist')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    paddingLeft: 30, background: selectedItem === 'deletedclientlist' ? '#ffffff' : hoveredItem === 'deletedclientlist' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon>
                                    <ArrowLeftIcon sx={{ color: selectedItem === 'deletedclientlist' ? 'black' : hoveredItem === 'deletedclientlist' ? 'black' : 'white', fontSize: '20px' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'deletedclientlist' ? 'black' : hoveredItem === 'deletedclientlist' ? 'black' : 'white', fontSize: '15px' }}>Deleted Clients List</Typography>}
                                />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton
                        style={{ background: hoverStates[5] ? 'white' : Constant.color[2] }}
                        // sx={{ backgroundColor: hoverStates[5] ? 'white' : Constant.color[0] }}
                        onClick={() => setOpen4(!open4)}
                        onMouseOver={() => handleMouseOver(5)}
                        onMouseOut={() => handleMouseOut(5)}
                    >
                        <ListItemIcon>
                            <GroupsIcon sx={{ color: hoverStates[5] ? 'black' : 'white', fontSize: '17px' }} />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ color: hoverStates[5] ? 'black' : 'white' }}
                            primary={
                                <Typography variant="body1" sx={{ color: hoverStates[5] ? 'black' : 'white', fontSize: '15px' }}>
                                    Manage Employee
                                </Typography>
                            }
                        />
                        {open4 ? <ExpandLessIcon sx={{ color: hoverStates[5] ? 'black' : 'white', fontSize: '17px' }} /> : <ExpandMoreIcon sx={{ color: hoverStates[5] ? 'black' : 'white', fontSize: '17px' }} />}
                    </ListItemButton>
                    <Collapse in={open4} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton
                                selected={selectedItem === 'employeelist'}
                                onClick={() => handleItemClick('employeelist')}
                                onMouseEnter={() => setHoveredItem('employeelist')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    paddingLeft: 30, background: selectedItem === 'employeelist' ? '#ffffff' : hoveredItem === 'employeelist' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon>
                                    <ArrowLeftIcon sx={{ color: selectedItem === 'employeelist' ? 'black' : hoveredItem === 'employeelist' ? 'black' : 'white', fontSize: '20px' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'employeelist' ? 'black' : hoveredItem === 'employeelist' ? 'black' : 'white', fontSize: '15px' }}>Employees List</Typography>}
                                />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedItem === 'deletedemployeelist'}
                                onClick={() => handleItemClick('deletedemployeelist')}
                                onMouseEnter={() => setHoveredItem('deletedemployeelist')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    paddingLeft: 30, background: selectedItem === 'deletedemployeelist' ? '#ffffff' : hoveredItem === 'deletedemployeelist' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon>
                                    <ArrowLeftIcon sx={{ color: selectedItem === 'deletedemployeelist' ? 'black' : hoveredItem === 'deletedemployeelist' ? 'black' : 'white', fontSize: '20px' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'deletedemployeelist' ? 'black' : hoveredItem === 'deletedemployeelist' ? 'black' : 'white', fontSize: '15px' }}>Deleted Employees List</Typography>}
                                />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedItem === 'addemployee'}
                                onClick={() => handleItemClick('addemployee')}
                                onMouseEnter={() => setHoveredItem('addemployee')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    paddingLeft: 30, background: selectedItem === 'addemployee' ? '#ffffff' : hoveredItem === 'addemployee' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon>s
                                    <ArrowLeftIcon sx={{ color: selectedItem === 'addemployee' ? 'black' : hoveredItem === 'addemployee' ? 'black' : 'white', fontSize: '20px' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'addemployee' ? 'black' : hoveredItem === 'addemployee' ? 'black' : 'white', fontSize: '15px' }}>Add Employee</Typography>}
                                />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton
                        style={{ background: hoverStates[6] ? 'white' : Constant.color[2] }}
                        // sx={{ backgroundColor: hoverStates[4] ? 'white' : Constant.color[0] }}
                        onClick={() => setOpen5(!open5)}
                        onMouseOver={() => handleMouseOver(6)}
                        onMouseOut={() => handleMouseOut(6)}
                    >
                        <ListItemIcon>
                            <GroupsIcon sx={{ color: hoverStates[6] ? 'black' : 'white', fontSize: '17px' }} />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ color: hoverStates[6] ? 'black' : 'white' }}
                            primary={
                                <Typography variant="body1" sx={{ color: hoverStates[6] ? 'black' : 'white', fontSize: '15px' }}>
                                    Manage Vihicle
                                </Typography>
                            }
                        />
                        {open5 ? <ExpandLessIcon sx={{ color: hoverStates[6] ? 'black' : 'white', fontSize: '17px' }} /> : <ExpandMoreIcon sx={{ color: hoverStates[6] ? 'black' : 'white', fontSize: '17px' }} />}
                    </ListItemButton>
                    <Collapse in={open5} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton
                                selected={selectedItem === 'vehiclelist'}
                                onClick={() => handleItemClick('userlist')}
                                onMouseEnter={() => setHoveredItem('userlist')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    paddingLeft: 30, background: selectedItem === 'userlist' ? '#ffffff' : hoveredItem === 'userlist' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon>
                                    <ArrowLeftIcon sx={{ color: selectedItem === 'userlist' ? 'black' : hoveredItem === 'userlist' ? 'black' : 'white', fontSize: '20px' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'userlist' ? 'black' : hoveredItem === 'userlist' ? 'black' : 'white', fontSize: '15px' }}>Vihicles List</Typography>}
                                />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedItem === 'deleteduserlist'}
                                onClick={() => handleItemClick('deleteduserlist')}
                                onMouseEnter={() => setHoveredItem('deleteduserlist')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    paddingLeft: 30, background: selectedItem === 'deleteduserlist' ? '#ffffff' : hoveredItem === 'deleteduserlist' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon>
                                    <ArrowLeftIcon sx={{ color: selectedItem === 'deleteduserlist' ? 'black' : hoveredItem === 'deleteduserlist' ? 'black' : 'white', fontSize: '20px' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'deleteduserlist' ? 'black' : hoveredItem === 'deleteduserlist' ? 'black' : 'white', fontSize: '15px' }}>Deleted Vihicles List</Typography>}
                                />
                            </ListItemButton>
                            <ListItemButton
                                selected={selectedItem === 'addVehicle'}
                                onClick={() => handleItemClick('addVehicle')}
                                onMouseEnter={() => setHoveredItem('addVehicle')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    paddingLeft: 30, background: selectedItem === 'addVehicle' ? '#ffffff' : hoveredItem === 'addVehicle' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon>
                                    <ArrowLeftIcon sx={{ color: selectedItem === 'addVehicle' ? 'black' : hoveredItem === 'addVehicle' ? 'black' : 'white', fontSize: '20px' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'addVehicle' ? 'black' : hoveredItem === 'addVehicle' ? 'black' : 'white', fontSize: '15px' }}>Add Vehicle</Typography>}
                                />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    {/* <ListItemButton
                        selected={selectedItem === 'triplist'}
                        onClick={() => handleItemClick('triplist')}
                        onMouseEnter={() => setHoveredItem('triplist')}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{
                            background: selectedItem === 'triplist' ? '#ffffff' : hoveredItem === 'triplist' ? '#f0f0f0' : Constant.color[2]
                        }}
                    >
                        <ListItemIcon>
                            <ModeOfTravelIcon sx={{ color: selectedItem === 'triplist' ? 'black' : hoveredItem === 'triplist' ? 'black' : 'white', fontSize: '20px' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography variant="body1" sx={{ color: selectedItem === 'triplist' ? 'black' : hoveredItem === 'triplist' ? 'black' : 'white', fontSize: '15px' }}>Manage Trips</Typography>}
                        />
                    </ListItemButton> */}



                    {/* <ListItemButton
                        selected={selectedItem === 'carlist'}
                        onClick={() => handleItemClick('carlist')}
                        onMouseEnter={() => setHoveredItem('carlist')}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{
                            background: selectedItem === 'carlist' ? '#ffffff' : hoveredItem === 'carlist' ? '#f0f0f0' : Constant.color[2]
                        }}
                    >
                        <ListItemIcon>
                            <DirectionsCarFilledIcon sx={{ color: selectedItem === 'carlist' ? 'black' : hoveredItem === 'carlist' ? 'black' : 'white', fontSize: '20px' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography variant="body1" sx={{ color: selectedItem === 'carlist' ? 'black' : hoveredItem === 'carlist' ? 'black' : 'white', fontSize: '15px' }}>Manage Cars</Typography>}
                        />
                    </ListItemButton> */}

                    <ListItemButton
                        selected={selectedItem === 'subscription'}
                        onClick={() => handleItemClick('subscription')}
                        onMouseEnter={() => setHoveredItem('subscription')}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{
                            background: selectedItem === 'subscription' ? '#ffffff' : hoveredItem === 'subscription' ? '#f0f0f0' : Constant.color[2]
                        }}
                    >
                        <ListItemIcon>
                            <LoyaltyIcon sx={{ color: selectedItem === 'subscription' ? 'black' : hoveredItem === 'subscription' ? 'black' : 'white', fontSize: '20px' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography variant="body1" sx={{ color: selectedItem === 'subscription' ? 'black' : hoveredItem === 'subscription' ? 'black' : 'white', fontSize: '15px' }}>Manage Subscriptions</Typography>}
                        />
                    </ListItemButton>


                    {/* <ListItemButton
                        selected={selectedItem === 'plans'}
                        onClick={() => handleItemClick('plans')}
                        onMouseEnter={() => setHoveredItem('plans')}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{
                            background: selectedItem === 'plans' ? '#ffffff' : hoveredItem === 'plans' ? '#f0f0f0' : Constant.color[2]
                        }}
                    >
                        <ListItemIcon>
                            <SubscriptionsIcon sx={{ color: selectedItem === 'plans' ? 'black' : hoveredItem === 'plans' ? 'black' : 'white', fontSize: '20px' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography variant="body1" sx={{ color: selectedItem === 'plans' ? 'black' : hoveredItem === 'plans' ? 'black' : 'white', fontSize: '15px' }}>Manage Plans</Typography>}
                        />
                    </ListItemButton> */}


                    <ListItemButton
                        selected={selectedItem === 'content'}
                        onClick={() => handleItemClick('content')}
                        onMouseEnter={() => setHoveredItem('content')}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{
                            background: selectedItem === 'content' ? '#ffffff' : hoveredItem === 'content' ? '#f0f0f0' : Constant.color[2]
                        }}
                    >
                        <ListItemIcon>
                            <ContentCopyIcon sx={{ color: selectedItem === 'content' ? 'black' : hoveredItem === 'content' ? 'black' : 'white', fontSize: '20px' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography variant="body1" sx={{ color: selectedItem === 'content' ? 'black' : hoveredItem === 'content' ? 'black' : 'white', fontSize: '15px' }}>Manage Contents</Typography>}
                        />
                    </ListItemButton>




                    <ListItemButton
                        selected={selectedItem === 'contactUs'}
                        onClick={() => handleItemClick('contactUs')}
                        onMouseEnter={() => setHoveredItem('contactUs')}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{
                            background: selectedItem === 'contactUs' ? '#ffffff' : hoveredItem === 'contactUs' ? '#f0f0f0' : Constant.color[2]
                        }}
                    >
                        <ListItemIcon>
                            <CallIcon sx={{ color: selectedItem === 'contactUs' ? 'black' : hoveredItem === 'contactUs' ? 'black' : 'white', fontSize: '20px' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography variant="body1" sx={{ color: selectedItem === 'contactUs' ? 'black' : hoveredItem === 'contactUs' ? 'black' : 'white', fontSize: '15px' }}>Manage Contacts Us</Typography>}
                        />
                    </ListItemButton>


                    <ListItemButton
                        selected={selectedItem === 'broadcast'}
                        onClick={() => handleItemClick('broadcast')}
                        onMouseEnter={() => setHoveredItem('broadcast')}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{
                            background: selectedItem === 'broadcast' ? '#ffffff' : hoveredItem === 'broadcast' ? '#f0f0f0' : Constant.color[2]
                        }}
                    >
                        <ListItemIcon>
                            <CellTowerIcon sx={{ color: selectedItem === 'broadcast' ? 'black' : hoveredItem === 'broadcast' ? 'black' : 'white', fontSize: '20px' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography variant="body1" sx={{ color: selectedItem === 'broadcast' ? 'black' : hoveredItem === 'broadcast' ? 'black' : 'white', fontSize: '15px' }}>Manage Broadcast</Typography>}
                        />
                    </ListItemButton>



                    <ListItemButton
                        style={{ background: hoverStates[11] ? 'white' : Constant.color[2] }}
                        onClick={() => setOpen2(!open2)}
                        onMouseOver={() => handleMouseOver(11)}
                        onMouseOut={() => handleMouseOut(11)}
                    >
                        <ListItemIcon>
                            <SummarizeIcon sx={{ color: hoverStates[11] ? 'black' : 'white', fontSize: '17px' }} />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ color: hoverStates[11] ? 'black' : 'white' }}
                            primary={
                                <Typography variant="body1" sx={{ color: hoverStates[11] ? 'black' : 'white', fontSize: '15px' }}>
                                    Tabular Report
                                </Typography>
                            }
                        />
                        {open2 ? <ExpandLessIcon sx={{ color: hoverStates[11] ? 'black' : 'white', fontSize: '17px' }} /> : <ExpandMoreIcon sx={{ color: hoverStates[11] ? 'black' : 'white', fontSize: '17px' }} />}
                    </ListItemButton>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton
                                selected={selectedItem === 'userTabularReport'}
                                onClick={() => handleItemClick('userTabularReport')}
                                onMouseEnter={() => setHoveredItem('userTabularReport')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    paddingLeft: 30, background: selectedItem === 'userTabularReport' ? '#ffffff' : hoveredItem === 'userTabularReport' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon>
                                    <ArrowLeftIcon sx={{ color: selectedItem === 'userTabularReport' ? 'black' : hoveredItem === 'userTabularReport' ? 'black' : 'white', fontSize: '20px' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'userTabularReport' ? 'black' : hoveredItem === 'userTabularReport' ? 'black' : 'white', fontSize: '15px' }}>Users Tabular Report</Typography>}
                                />
                            </ListItemButton>
                            {/* <ListItemButton
                                selected={selectedItem === 'musaTabularReport'}
                                onClick={() => handleItemClick('musaTabularReport')}
                                onMouseEnter={() => setHoveredItem('musaTabularReport')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    paddingLeft: 30, background: selectedItem === 'musaTabularReport' ? '#ffffff' : hoveredItem === 'musaTabularReport' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon>
                                    <ArrowLeftIcon sx={{ color: selectedItem === 'musaTabularReport' ? 'black' : hoveredItem === 'musaTabularReport' ? 'black' : 'white', fontSize: '20px' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'musaTabularReport' ? 'black' : hoveredItem === 'musaTabularReport' ? 'black' : 'white', fontSize: '15px' }}>MUSA Tabular Report</Typography>}
                                />
                            </ListItemButton> */}
                            {/* <ListItemButton
                                selected={selectedItem === 'reportedUser'}
                                onClick={() => handleItemClick('reportedUser')}
                                onMouseEnter={() => setHoveredItem('reportedUser')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    paddingLeft: 30, background: selectedItem === 'reportedUser' ? '#ffffff' : hoveredItem === 'reportedUser' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon>
                                    <ArrowLeftIcon sx={{ color: selectedItem === 'reportedUser' ? 'black' : hoveredItem === 'reportedUser' ? 'black' : 'white', fontSize: '20px' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'reportedUser' ? 'black' : hoveredItem === 'reportedUser' ? 'black' : 'white', fontSize: '15px' }}>Reported User Report</Typography>}
                                />
                            </ListItemButton> */}
                            {/* <ListItemButton
                                selected={selectedItem === 'reportedMusa'}
                                onClick={() => handleItemClick('reportedMusa')}
                                onMouseEnter={() => setHoveredItem('reportedMusa')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    paddingLeft: 30, background: selectedItem === 'reportedMusa' ? '#ffffff' : hoveredItem === 'reportedMusa' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon>
                                    <ArrowLeftIcon sx={{ color: selectedItem === 'reportedMusa' ? 'black' : hoveredItem === 'reportedMusa' ? 'black' : 'white', fontSize: '20px' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'reportedMusa' ? 'black' : hoveredItem === 'reportedMusa' ? 'black' : 'white', fontSize: '15px' }}>Reported MUSA Report</Typography>}
                                />
                            </ListItemButton> */}
                        </List>
                    </Collapse>



                    <ListItemButton
                        style={{ background: hoverStates[12] ? 'white' : Constant.color[2] }}
                        onClick={() => setOpen3(!open3)}
                        onMouseOver={() => handleMouseOver(12)}
                        onMouseOut={() => handleMouseOut(12)}
                    >
                        <ListItemIcon>
                            <SummarizeIcon sx={{ color: hoverStates[12] ? 'black' : 'white', fontSize: '17px' }} />
                        </ListItemIcon>
                        <ListItemText
                            sx={{ color: hoverStates[12] ? 'black' : 'white' }}
                            primary={
                                <Typography variant="body1" sx={{ color: hoverStates[12] ? 'black' : 'white', fontSize: '15px' }}>
                                    Analytical Report
                                </Typography>
                            }
                        />
                        {open3 ? <ExpandLessIcon sx={{ color: hoverStates[12] ? 'black' : 'white', fontSize: '17px' }} /> : <ExpandMoreIcon sx={{ color: hoverStates[12] ? 'black' : 'white', fontSize: '17px' }} />}
                    </ListItemButton>
                    <Collapse in={open3} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton
                                selected={selectedItem === 'userAnalyticalReport'}
                                onClick={() => handleItemClick('userAnalyticalReport')}
                                onMouseEnter={() => setHoveredItem('userAnalyticalReport')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    paddingLeft: 30, background: selectedItem === 'userAnalyticalReport' ? '#ffffff' : hoveredItem === 'userAnalyticalReport' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon>
                                    <ArrowLeftIcon sx={{ color: selectedItem === 'userAnalyticalReport' ? 'black' : hoveredItem === 'userAnalyticalReport' ? 'black' : 'white', fontSize: '20px' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'userAnalyticalReport' ? 'black' : hoveredItem === 'userAnalyticalReport' ? 'black' : 'white', fontSize: '15px' }}>Users Analytical Report</Typography>}
                                />
                            </ListItemButton>
                            {/* <ListItemButton
                                selected={selectedItem === 'musaAnalyticalReport'}
                                onClick={() => handleItemClick('musaAnalyticalReport')}
                                onMouseEnter={() => setHoveredItem('musaAnalyticalReport')}
                                onMouseLeave={() => setHoveredItem(null)}
                                style={{
                                    paddingLeft: 30, background: selectedItem === 'musaAnalyticalReport' ? '#ffffff' : hoveredItem === 'musaAnalyticalReport' ? '#f0f0f0' : Constant.color[2]
                                }}
                            >
                                <ListItemIcon>
                                    <ArrowLeftIcon sx={{ color: selectedItem === 'musaAnalyticalReport' ? 'black' : hoveredItem === 'musaAnalyticalReport' ? 'black' : 'white', fontSize: '20px' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Typography variant="body1" sx={{ color: selectedItem === 'musaAnalyticalReport' ? 'black' : hoveredItem === 'musaAnalyticalReport' ? 'black' : 'white', fontSize: '15px' }}>MUSA Analytical Report</Typography>}
                                />
                            </ListItemButton> */}



                        </List>
                    </Collapse>
                </List>
            </Box>
        </Box>
    );
}
