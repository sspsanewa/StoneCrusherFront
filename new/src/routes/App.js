import { BrowserRouter, Navigate, Route, Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Box from '@mui/material/Box';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Broadcast from '../pages/Broadcast';
import ContactUs from '../pages/ContactUs';
import Footer from '../components/Footer'
import Content from '../pages/Content';
import DeletedUserList from '../pages/DeletedUserList';
import ViewClient from '../pages/ViewClient';
import ViewDeleteUser from '../pages/ViewDeleteUser';
import UserAnalyticalReport from '../pages/UserAnalyticalReport';

import ResetPassword from '../pages/ResetPassword';
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import { styled } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import Url from '../Config/Url';
import axios from 'axios';
import New from '../pages/New';
import New1 from '../pages/New1';
import Subscription from '../pages/Subscription';
import Car from '../pages/Car';
import ClientList from '../pages/ClientList';
import AddClient from '../pages/AddClient';
import EditClient from '../pages/EditClient';
import Bill from '../components/Bill';
import AddEmployee from '../pages/AddEmployee';
import AddVehical from '../pages/AddVehical';
import EditEmployee from '../pages/EditEmployee';
import EmployeeList from '../pages/EmployeeList';
import ViewEmployee from '../pages/ViewEmployee';
import VehicleList from '../pages/VehicleList';
import ViewVehicle from '../pages/ViewVehicle';
import EditVehicle from '../pages/EditVehicle';
import ExpenseList from '../pages/ExpenseList';
import AddExpense from '../pages/AddExpense';
import ClientTabularReport from '../pages/ClientTabularReport';
import EditExpense from '../pages/EditExpense';
import ViewExpense from '../pages/ViewExpense';
import ExpenseTabularReport from '../pages/ExpenseTabularReport';

const drawerWidth = 270;

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
    width: `calc(${theme.spacing(8)} + 9px)`,
  },
});





const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    overflow: 'hidden', // Added to remove scrollbar
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': {
        ...openedMixin(theme),
        overflow: 'hidden', // Added to remove scrollbar from the paper element
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': {
        ...closedMixin(theme),
        overflow: 'hidden', // Added to remove scrollbar from the paper element
      },
    }),
  }),
);

function App() {
  const location = useLocation();
  const hideNavbarAndSidebar = location.pathname === `/${APP_PREFIX_PATH}` || location.pathname === `/${APP_PREFIX_PATH}/forgotPassword` || location.pathname === `/${APP_PREFIX_PATH}/resetPassword`;
  const [open, setOpen] = React.useState(true);
  const path = location.pathname;

  const token = localStorage.getItem('token');
  let tokenExists = token !== null;




  const data = { action: 'verify_token', user_id: localStorage.getItem('userId'), token: token }

  axios.post(`${Url}/auth/verify_token`, data)
    .then(res => {
      if (res.data.success) {
        tokenExists = true
      } else {
        tokenExists = false
      }
    })
    .catch(err => console.log(err))




  const [change, setChange] = useState(false)
  const language = 'en';
  return (

    <Box>
      {!tokenExists && (
        <>
          {path !== `/${APP_PREFIX_PATH}` && path !== `/${APP_PREFIX_PATH}/forgotPassword` && path !== `/${APP_PREFIX_PATH}/resetPassword` && (
            <>
              <Navigate from="*" to={`/${APP_PREFIX_PATH}`} />
            </>
          )}

          {hideNavbarAndSidebar === true &&
            <Routes>
              <Route path={`/${APP_PREFIX_PATH}/`} element={<Login />} />
              <Route path={`/${APP_PREFIX_PATH}/forgotPassword`} element={<ForgotPassword />} />
              <Route path={`/${APP_PREFIX_PATH}/resetPassword`} element={<ResetPassword />} />
            </Routes>

          }
        </>
      )}
      {tokenExists && (
        <>
          {(path === `/${APP_PREFIX_PATH}` || path === '/' || path === `/${APP_PREFIX_PATH}/forgotPassword` || path === `/${APP_PREFIX_PATH}/resetPassword`) && (

            <>

              <Navigate from={`/${APP_PREFIX_PATH}/`} to={`/${APP_PREFIX_PATH}/dashboard`} />
              <Navigate from={`/${APP_PREFIX_PATH}/forgotPassword`} to={`/${APP_PREFIX_PATH}/dashboard`} />
              <Navigate from={`/${APP_PREFIX_PATH}/resetPassword`} to={`/${APP_PREFIX_PATH}/dashboard`} />

            </>
          )}
          {(!hideNavbarAndSidebar === true) &&
            <Box >
              <Box display={'flex'}>
                <Drawer sx={{ position: { xs: 'absolute', md: 'initial' }, left: '0', top: '0' }} variant="permanent" open={open}>
                  <Sidebar open={open} setOpen={setOpen} language={language} />
                </Drawer>
                <Box width={'100%'}>
                  <Navbar open={open} setOpen={setOpen} change={change} setChange={setChange} language={language} />
                  <Routes >
                    <Route path={`/${APP_PREFIX_PATH}`} element={<Dashboard language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/`} element={<Dashboard language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/dashboard`} element={<Dashboard language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/profile`} element={<Profile change={change} setChange={setChange} language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/broadcast`} element={<Broadcast language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/contactUs`} element={<ContactUs language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/content`} element={<Content />} language={language} />
                    <Route path={`/${APP_PREFIX_PATH}/clientlist`} element={<ClientList language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/carlist`} element={<Car />} language={language} />
                    <Route path={`/${APP_PREFIX_PATH}/deleteduserlist`} element={<DeletedUserList language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/viewclient/:id`} element={<ViewClient language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/viewDeleteUser/:id`} element={<ViewDeleteUser language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/userAnalyticalReport`} element={<UserAnalyticalReport language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/new`} element={<New language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/new1`} element={<New1 language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/subscription`} element={<Subscription language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/addclient`} element={<AddClient language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/editclient/:id`} element={<EditClient language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/bill`} element={<Bill language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/addemployee`} element={<AddEmployee language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/editemployee/:id`} element={<EditEmployee language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/employeelist`} element={<EmployeeList language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/viewEmployee/:id`} element={<ViewEmployee language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/addVehicle`} element={<AddVehical language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/vehiclelist`} element={<VehicleList language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/viewVehicle/:id`} element={<ViewVehicle language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/editVehicle/:id`} element={<EditVehicle language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/expenselist`} element={<ExpenseList language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/addExpense`} element={<AddExpense language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/viewExpense/:id`} element={<ViewExpense language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/editExpense/:id`} element={<EditExpense language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/clientTabularReport`} element={<ClientTabularReport language={language} />} />
                    <Route path={`/${APP_PREFIX_PATH}/expenseTabularReport`} element={<ExpenseTabularReport language={language} />} />


                  </Routes>

                  <Box position={'fixed'} width={'100%'} right={0} bottom={0}>
                    <Footer language={language} />
                  </Box>
                </Box>
              </Box>

            </Box>
          }
        </>
      )
      }

    </Box >
  );
}

export default App;
