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

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/dashboardPage' element={<DashboardPage />} />
        <Route path='/profilePage' element={<ProfilePage />}></Route>
        <Route path='/userListPage' element={<UserListPage />}></Route>
        <Route path='/manageContentPage' element={<ManageContentPage />}></Route>
        <Route path='/addDetailPage' element={<AddDetailPage />}></Route>
        <Route path='/manageEarningPage' element={<ManageEarningPage />}></Route>
        <Route path='/manageContactUsPage' element={<ManageContactUSPage />}></Route>
        <Route path='/replyPage/:id' element={<ReplyPage />}></Route>
        <Route path='/viewPage/:id' element={<ViewPage />}></Route>
        <Route path='/viewDeletedPage/:id' element={<ViewDeletedPage />}></Route>
        <Route path='/deletedUserPage' element={<DeletedUserPage />}></Route>





      </Routes>
    </BrowserRouter>
  );
}

export default App;
