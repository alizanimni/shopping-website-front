import React, { useContext, useEffect, useState } from "react";
import { addItemToCart, addItemToFavorite, getItems, removeItemFromCart, removeItemFromFavoriteDB } from "../services/ApiService";
import { useItems } from "../context/ItemContext";
import '../styles/HomePage.css'; 
import Search from "../components/Search";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const HomePage = () =>{
    const { items,uptadeItemsSpair,setItemsSpairFirstTime } = useItems();
    const [itemsToShow , setItemsToShow] = useState(items)
    const {currentUser ,updateFavorites, updateCart,favorites,removeFromFavorites,cart,removeItemFromCartLocal} = useContext(UserContext);
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

const addItem=async(itemId,quantity,price)=>{
  if(currentUser==null){
    navigate("/login")
  }else{
  console.log("==> addItem called for item", itemId);
  try{
await addItemToCart(itemId,quantity,price) 
updateCart(itemId,price)
uptadeItemsSpair(itemId,-1)
  }catch(err){
console.log(err);

  }    
  }


}

const handleRemoveFromCart=(itemId,quantity,price)=>{
  if(currentUser==null){
    navigate("/login")
  }else{
        try{
        removeItemFromCart(itemId,quantity,price)
        removeItemFromCartLocal(itemId,quantity,price)
        uptadeItemsSpair(itemId,1)
        }catch(err){
             console.log(err);
             
        }   
  }
 
}

useEffect(() => {
  if (items.length > 0) {
    setItemsToShow(items);
  }
}, [items]);

useEffect(() => {
  var alreadyInitialized = localStorage.getItem('itemsAdjusted');
  console.log(alreadyInitialized);
  
  if(!alreadyInitialized && items.length > 0 && currentUser!==null && cart.itemsOnOrder.length > 0) {
    setItemsSpairFirstTime(cart.itemsOnOrder);
    console.log("first");
    
    console.log(cart.itemsOnOrder);
    localStorage.setItem('itemsAdjusted', 'true');
  
  }
}, [cart.itemsOnOrder, items,currentUser]);

const handleAddToFavorite = async (itemId) => {
    try {
      await addItemToFavorite(itemId);

      updateFavorites(itemId);
    } catch (error) {
      console.error('Failed to add to favorites', error);
    }
  };

  const handleRemoveFromFavorites=async(itemId)=>{
    try {
      await removeItemFromFavoriteDB(itemId)

      removeFromFavorites(itemId);
    } catch (error) {
      console.error('Failed to add to favorites', error);
      alert('משהו השתבש. נסה שוב מאוחר יותר.');
    }
  }

  const handleSearch = (input) => {
    setSearchInput(input);
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setItemsToShow(filteredItems);
  };


    const itemInCart = cart.itemsOnOrder.map(item=>item.itemId) 
  const isIteminCart=(itemId)=>{
  if(itemInCart.includes(itemId)){
      return cart.itemsOnOrder.map(item=>{
        if(item.itemId===itemId)
        return item.quantity
      }) 
  }else{
    return 0
  }

  }

return(
<div>
  <Search onSearch={handleSearch} />
  <div className="items-container">
    {itemsToShow.map(item => (
      <div key={item.id} className="item-card">
    {
       favorites.includes(item.id)?
       
     <div className="icon-circle" onClick={()=>{handleRemoveFromFavorites(item.id)}} ><FaHeart className="red-heart-icon"/></div> 
      :
               <div className="icon-circle" onClick={()=>{ currentUser==null? navigate("/login") : handleAddToFavorite(item.id)}}>
                <FaRegHeart className="heart-icon" />
                </div>      
    }
     
        <img src={item.photo} alt={item.name} />
        <h3>{item.name}</h3>
  
        <p className="price">{Number.isInteger(item.price) ? item.price : item.price.toFixed(2)}</p>
        <div className="quantity">left only: {item.item_quantity}</div>

        <div className="quantity-controls-home-page">
        <button
            onClick={() => handleRemoveFromCart(item.id,1,item.price)}
            className="quantity-button"
            disabled={isIteminCart(item.id)===0}
          >−</button>

          <span className="quantity-number">{isIteminCart(item.id)}</span>

          <button
             onClick={() => addItem(item.id,1,item.price)}
            className="quantity-button"
            disabled={item.item_quantity===0}
          >+</button>

        </div>


      </div>
    ))}
  </div>
</div>
)
}

export default HomePage