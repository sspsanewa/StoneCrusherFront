import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import UserListPage from '../pages/UserLIstPage';

import ManageContentPage from '../pages/ManageContentPage';

import ManageEarningPage from '../pages/ManageEarningPage';

import ManageContactUSPage from '../pages/ManageContactUsPage';
import ReplyPage from '../pages/ReplyPage';
import ViewPage from '../pages/ViewPage';
import DeletedUserPage from '../pages/DeletedUserPage';
import ViewDeletedPage from '../pages/ViewDeletedPage';

import AddDetailPage from '../pages/AddDetailPage';
import Dashboard from '@mui/icons-material/Dashboard';
import UserList from '../component/UserList';
import AddDetail from '../component/AddDetail';
import Home from '../pages/Home';

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








      </Routes>
    </BrowserRouter>
  );
}

export default App;
