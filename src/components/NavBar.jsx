import React from 'react';
import '../styles/Navbar.css';
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import Search from './Search';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
    return (
      <nav className="navbar">
        <div className="navbar-right">
   
        </div>
        <div className="navbar-center">
          <h1 className="logo">ElectricStore</h1>   
        </div>
        
        <div className="navbar-left">
   <FaUserAlt className="icon" onClick={()=>navigate("/login")}/>
         <FaShoppingCart className="icon"  onClick={()=>navigate("/cart")}/>     
         <FaRegHeart className="icon" onClick={()=>navigate("/favorite")}/>    
        </div>
      </nav>
    );
  };
  
  export default Navbar;