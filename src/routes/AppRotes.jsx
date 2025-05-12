import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import React, { useState } from "react";
import HomePage from '../pages/HomePage';
import PageNotFound from '../pages/PageNotFound';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';
import FavoriteItems from '../pages/FavoriteItems';
import CartPage from '../pages/CartPage';
import PayModal from '../components/PayModal';
import Profile from '../pages/Profile';

const AppRoutes = () => {
      const [user,setUser]=useState(null);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm/>} />
      <Route path='/registration' element={<RegistrationForm/>}/>
      <Route path='/favorite' element={<FavoriteItems/>}  />
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/payment' element={<PayModal/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;