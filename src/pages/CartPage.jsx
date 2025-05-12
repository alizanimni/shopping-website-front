import React, { useContext } from 'react'
import UserContext from '../context/UserContext';
import { useItems } from '../context/ItemContext';
import '../styles/Cart.css'; 
import { FaTrash } from 'react-icons/fa'; 
import { addItemToCart, removeItemFromCart } from '../services/ApiService';
import PayModal from '../components/PayModal';
import { useNavigate } from 'react-router-dom';
function CartPage() {
    const {cart , updateCart,removeItemFromCartLocal}= useContext(UserContext);
    const {items,uptadeItemsSpair}=useItems();
 
    const navigate = useNavigate();
    console.log(cart);
    
    console.log(items);
    
    const itemOnCart = cart.itemsOnOrder
    console.log(itemOnCart);

    const handleRemoveFromCart = (itemId,quantity,price) =>{
      try{
      removeItemFromCart(itemId,quantity,price)

      removeItemFromCartLocal(itemId,quantity,price)
      uptadeItemsSpair(itemId,quantity)
      }catch(err){
           console.log(err);
           
      }
    }

const handleIncrease= (itemId,quantity,price)=>{
  console.log(price);
  
  try{
   addItemToCart(itemId,quantity,price)
   updateCart(itemId,price)
   uptadeItemsSpair(itemId,-1)
  }catch(err){
    console.log(err);
  }
}
    

  return (
    <div>
    <h1 style={{ textAlign: "center" }}>Your cart</h1>
    <div className="cart-container">
      {itemOnCart.map(item => (
        
        <div key={item.itemId} className="cart-item-card">
          <div className="cart-item-info">  
            <div>        
          <img src={items[item.itemId-1].photo} alt={items[item.itemId-1].name} className="cart-item-photo" />
          </div>
<div>
            <h3>{items[item.itemId-1].name}</h3>
            <p className="price">{Number.isInteger(item.price) ? item.price : item.price.toFixed(2)} </p>
            <p>left only: {items[item.itemId-1].item_quantity}</p>
            </div>
          </div>

            <div className="quantity-controls">
          <button
           onClick={() => handleRemoveFromCart(item.itemId,1,items[item.itemId - 1].price)}
            className="quantity-button"
            disabled={item.quantity===0}
          >−</button>
          <span className="quantity-number">{item.quantity}</span>
          <button
            onClick={() => handleIncrease(item.itemId,1,items[item.itemId - 1].price)}
            className="quantity-button"
            disabled={0 >= items[item.itemId - 1].item_quantity}
          >+</button>
        </div>
        <button onClick={() => handleRemoveFromCart(item.itemId,item.quantity,item.price)}>
        <FaTrash className="trash-icon" /></button>
        

        </div>
      ))}
    </div>

    <div className="cart-summary">
  <h2>Order Summary</h2>
  <p>Total: <strong>{cart.total_price.toFixed(2)} ₪</strong></p>
  <button className="checkout-button" onClick={()=>navigate('/payment')} disabled={cart.total_price===0}>Checkout</button>
</div>
  </div>
  )
}

export default CartPage