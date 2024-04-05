import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';

import Dashboard from '@mui/icons-material/Dashboard';
import UserList from '../component/UserList';
import AddDetail from '../component/AddDetail';
import Home from '../pages/Home';
import Bill from '../component/New';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/userList' element={<UserList />}></Route>
        <Route path='/addDetail' element={<AddDetail />}></Route>
        <Route path='/bill' element={<Bill />}></Route>








      </Routes>
    </BrowserRouter>
  );
}

export default App;
