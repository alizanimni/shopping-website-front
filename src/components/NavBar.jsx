import React, { useContext } from 'react';
import '../styles/Navbar.css';
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import Search from './Search';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';


const Navbar = () => {
  const {currentUser,logout} = useContext(UserContext)
    const navigate = useNavigate();
    return (
      <nav className="navbar">
        <div className="navbar-right">
        {currentUser!==null && <RiLogoutBoxRLine className="icon" size={24} onClick={()=>{logout(); navigate('/login')}}/>}
        </div>
        <div className="navbar-center">
          <h1 className="logo"  onClick={()=>navigate("/")}>ElectricStore</h1>   
        </div>
        
        <div className="navbar-left">
   <FaUserAlt className="icon" onClick={()=>currentUser==null? navigate("/login"): navigate("/profile")}/>
         <FaShoppingCart className="icon"  onClick={()=> currentUser==null? navigate("/login") : navigate("/cart")}/>     
         <FaRegHeart className="icon" onClick={()=> currentUser==null? navigate("/login") : navigate("/favorite")}/>    
        </div>
      </nav>
    );
  };
  
  export default Navbar;