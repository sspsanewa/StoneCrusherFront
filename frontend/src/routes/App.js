import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';

import Dashboard from '@mui/icons-material/Dashboard';
import UserList from '../component/UserList';
import AddDetail from '../component/AddDetail';
import Home from '../pages/Home';
import Bill from '../component/Bill';
import UserListPage from '../pages/UserLIstPage';
import DashboardPage from '../pages/DashboardPage';
import AddDetailPage from '../pages/AddDetailPage';
import { Box } from '@mui/material'
import Navbar from '../component/Navbar';
import ViewPage from '../pages/ViewPage';
import AddEmployeePage from '../pages/AddEmployeePage';
import AddVehiclePage from '../pages/AddVehiclePage';
import ViewEmployeePage from '../pages/ViewEmployeePage';
import EmployeeListPage from '../pages/EmployeeListPage';
import EditClientPage from '../pages/EditClientPage';
function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/userList' element={<UserListPage />}></Route>
        <Route path='/addClient' element={<AddDetailPage />}></Route>
        <Route path='/editClient' element={<EditClientPage />}></Route>

        <Route path='/bill' element={<Bill />}></Route>
        <Route path='/viewUser' element={<ViewPage />}></Route>
        <Route path='/addEmployee' element={<AddEmployeePage />}></Route>
        <Route path='/employeeList' element={<EmployeeListPage />}></Route>
        <Route path='/viewEmployee' element={< ViewEmployeePage />}></Route>
        <Route path='/addVehicle' element={< AddVehiclePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
