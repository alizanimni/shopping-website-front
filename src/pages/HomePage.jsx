import React, { useContext, useEffect } from "react";
import { addItemToCart, addItemToFavorite, getItems } from "../services/ApiService";
import { useItems } from "../context/ItemContext";
import '../styles/HomePage.css'; 
import Search from "../components/Search";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import UserContext from "../context/UserContext";
const HomePage = () =>{
    const { items } = useItems();
    const {updateFavorites, updateCart} = useContext(UserContext);
const addItem=(itemId,quantity,price)=>{
addItemToCart(itemId,quantity,price)
updateCart(itemId,price)

}

const handleAddToFavorite = async (itemId) => {
    try {
      await addItemToFavorite(itemId);
      alert('המוצר נוסף למועדפים!');

      updateFavorites(itemId);
    } catch (error) {
      console.error('Failed to add to favorites', error);
      alert('משהו השתבש. נסה שוב מאוחר יותר.');
    }
  };



return(
<div>
  <h1 style={{ textAlign: "center" }}>המוצרים שלנו</h1>
  <Search/>
  <div className="items-container">
    {items.map(item => (
      <div key={item.id} className="item-card">
              <div className="icon-circle" onClick={()=>{handleAddToFavorite(item.id)}}><FaRegHeart className="heart-icon" />       </div>      
        <img src={item.photo} alt={item.name} />
        <h3>{item.name}</h3>
  
        <p className="price">{Number.isInteger(item.price) ? item.price : item.price.toFixed(2)}</p>
        <div className="quantity">left only: {item.item_quantity}</div>
        <button onClick={()=>{addItem(item.id,1,item.price)}}>Add +</button>
      </div>
    ))}
  </div>
</div>
)
}

export default HomePage