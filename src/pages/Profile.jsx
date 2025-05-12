import React, { useContext, useId } from 'react'
import '../styles/Profile.css'; 
import { useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import { deleteUser, fetchAllClosedOrders, updateUserDetails } from '../services/ApiService';
import { FaShoppingCart} from "react-icons/fa";
import { useItems } from '../context/ItemContext';
import validator from 'validator';
import { Navigate, useNavigate } from 'react-router-dom';




function Profile() {
  const {cart ,currentUser, getUserData, logout}= useContext(UserContext);
  const {items} = useItems();
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [updateMode, setUpDateMode] = useState(false);
  const [email,setEmail]= useState("")
  const [firstNmae,setFirstName]= useState("")
  const [lastName,setLastName]= useState("")
  const [address,setAdress]= useState("")
  const [PhoneNumber,setPhoneNumber]= useState("")
  const [validUpdate,setValidUpdate]=useState(true)
  const user = localStorage.getItem('user')
  const navigate = useNavigate();
  console.log(user);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
         const response = await fetchAllClosedOrders()
         console.log(response.data);
         
         setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);



  if (!currentUser) {
    return <div>טוען נתוני משתמש...</div>;
  }

  const toggleOrder = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const updateDetails=()=>{
      setAdress(currentUser.address)
      setEmail(currentUser.email)
      setFirstName(currentUser.first_name)
      setLastName(currentUser.last_name)
      setPhoneNumber(currentUser.phone)
      setUpDateMode(true)
  }
  const isValidUpdates=()=>{
   if(address.length<10){
     setValidUpdate(false)
   }else{
    setValidUpdate(true)
   }
    if(firstNmae<4){
      setValidUpdate(false)
      return
    }else{
     setValidUpdate(true)
    }
    if(lastName<2){
      setValidUpdate(false)
      return
    }else{
     setValidUpdate(true)
    }
    if(!(validator.isEmail(email))){
      setValidUpdate(false)
      return
    }else{
     setValidUpdate(true)
    }
    if(!(/^[0-9]{10}$/.test(PhoneNumber))){
      setValidUpdate(false)
      return
    }else{
     setValidUpdate(true)
    }
      console.log(validUpdate);
      
  }

  const onClickChange=async()=>{
    try{
    const user = await updateUserDetails(firstNmae,lastName,email,address,PhoneNumber)
 

    await getUserData()
    setUpDateMode(false)   
    navigate('/profile')  
    console.log(user);
    
    }catch(err){
     console.log(err)
     
    }
  }

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;
  
     try {
     await deleteUser()
      alert("Your account has been deleted.");
      logout();
      navigate("/")
    } catch (error) {
      console.error("Failed to delete account", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="profile-container">
      
      <h2>Profile</h2>
{!updateMode  &&    <div className="user-info">
        <p><strong>address:</strong> {currentUser.address}</p>
        <p><strong>email:</strong> {currentUser.email}</p>
        <p><strong>first name:</strong> {currentUser.first_name}</p>
        <p><strong>last name:</strong> {currentUser.last_name}</p>
        <p><strong>phone number:</strong> {currentUser.phone}</p>
        <button onClick={() => updateDetails()}>Editing details</button>
      </div>}

      {updateMode  &&    <div className="user-info">
        <div><label>address:</label>
        <input value={address} onChange={(e) => {setAdress(e.target.value); isValidUpdates()}}></input></div>

        <div><label>email:</label>
        <input value={email} onChange={(e) => {setEmail(e.target.value); isValidUpdates()}}></input></div>

        <div><label>first name:</label>
        <input value={firstNmae} onChange={(e) => {setFirstName(e.target.value); isValidUpdates()}}></input></div>

        <div><label>last name:</label>
        <input value={lastName} onChange={(e) => {setLastName(e.target.value); isValidUpdates()}}></input></div>

       <div> <label>phone number:</label>
        <input value={PhoneNumber} onChange={(e) => {setPhoneNumber(e.target.value); isValidUpdates()}}></input></div>

        <button onClick={() => onClickChange()} disabled={!validUpdate}>Change</button>
      </div>}
      <h3>Order history</h3>
      {orders.map(order => (
        <div key={order.id} className="order-block">
          <div onClick={() => toggleOrder(order.id)} className="order-summary">
           <div className='cart_icon_profile'>  <FaShoppingCart className="icon"/></div>
             <div>     
            <p><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
            <p><strong>Shipping address:</strong> {order.shipping_address} </p>
            <p><strong>Total:</strong> ₪{order.total_price}</p>
</div>
          </div>
          {expandedOrderId === order.id && (
  <div className="order-details">
    {order.itemsOnOrder.map(item => (
      <div key={item.itemId} className="order-item">
        <img src={items[item.itemId-1].photo} alt={item.name} className="item-image" />
        <div className="item-info">
          <p><strong>{items[item.itemId-1].name}</strong></p>
          <p>Quantity: {item.quantity}</p>
          <p>price per unit: ₪{item.price.toFixed(2)}</p>
          <p>Total: ₪{(item.quantity * item.price).toFixed(2)}</p>
        </div>
      </div>
    ))}
  </div>
)}
        </div>
      ))}

<button onClick={()=>{handleDeleteAccount()}}>Delete my account</button>
    </div>
  );
}

export default Profile;