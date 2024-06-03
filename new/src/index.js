import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../src/routes/App'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
// import store from './redux/store'
// import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //  <React.StrictMode>
  // <Provider >
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </Provider>
  // </React.StrictMode> */ }
);



