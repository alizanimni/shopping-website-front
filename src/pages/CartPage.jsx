import React, { useContext } from 'react'
import UserContext from '../context/UserContext';
import { useItems } from '../context/ItemContext';
import '../styles/Cart.css'; 
import { FaTrash } from 'react-icons/fa'; 
import { removeItemFromCart } from '../services/ApiService';
function CartPage() {
    const {cart }= useContext(UserContext);
    const {items}=useItems();
 
    console.log(cart);
    
    console.log(items);
    
    const itemOnCart = cart.itemsOnOrder
    console.log(itemOnCart);

    const handleRemoveFromCart = (itemId) =>{
      removeItemFromCart(itemId)
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
            <p>quantity: {item.quantity}</p>
            <p>left only: {items[item.itemId-1].item_quantity}</p>
            </div>
          </div>

             <button>
            <FaTrash className="trash-icon"  onClick={() => handleRemoveFromCart(item.itemId)}/></button>
        

        </div>
      ))}
    </div>

    <div className="cart-summary">
  <h2>Order Summary</h2>
  <p>Total: <strong>{cart.total_price.toFixed(2)} ₪</strong></p>
  <button className="checkout-button">Checkout</button>
</div>
  </div>
  )
}

export default CartPage