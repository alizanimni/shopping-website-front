import React, { useContext } from 'react'
import UserContext from '../context/UserContext'
import { useItems } from '../context/ItemContext';
import { FaTrash } from 'react-icons/fa'; 
import '../styles/FavoritesItems.css'; 

function FavoriteItems() {
    const {favorites}= useContext(UserContext);
    const {items}=useItems();
    console.log(favorites);
    
    console.log(items);
    
    const favoriteItems = items.filter(item => favorites.includes(item.id));

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>המועדפים שלך</h1>
            <div className="favorites-container">
                {favoriteItems.map(item => (
                    <div key={item.id} className="favorite-item-card">
                        <img src={item.photo} alt={item.name} className="favorite-item-photo" />
                        <div className="favorite-item-info">
                            <h3>{item.name}</h3>
                            <p className="price">{Number.isInteger(item.price) ? item.price : item.price.toFixed(2)}</p>
                            <div className="quantity">left only: {item.item_quantity}</div>


                          </div>                       
                            {/* <button onClick={() => handleRemoveFromFavorites(item.id)}> */}
                            <button>
                                <FaTrash className="trash-icon" /></button>
   
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavoriteItems;