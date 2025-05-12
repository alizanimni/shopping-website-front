import { createContext, useState, useEffect } from "react";
import { fetchCart, fetchFavorites, fetchUser, getUser, login } from "../services/ApiService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState({ itemsOnOrder: [], total_price: 0 });
  const [favorites, setFavorites] = useState([]);
  const [token,setToken] = useState(localStorage.getItem('token'))
  const getUserData = async () => {
    if (token) {
      console.log("shalom");
      
      try {
        const { data: userData } = await fetchUser();
        setCurrentUser(userData);
        localStorage.setItem('user',JSON.stringify(userData))
        console.log(userData);
        
        const [cartData, favoritesData] = await Promise.all([
          fetchCart(),
          fetchFavorites()
        ]);

        if(cartData.data===""){
         localStorage.setItem('cart',JSON.stringify(cart))      
        }else{
        setCart(cartData.data);          
        localStorage.setItem('cart',JSON.stringify(cartData.data))   
        }



        setFavorites(favoritesData.data);
        localStorage.setItem('favoritesItem',JSON.stringify(favoritesData.data))
      } catch (error) {
        console.error("Error fetching user data", error);
        logout()     
      }
    }
  };

  const logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('cart')
    localStorage.removeItem('favoritesItem')
    localStorage.removeItem('user')
    localStorage.removeItem('itemsAdjusted')
    setCurrentUser(null)
    setCart({ itemsOnOrder: [], total_price: 0 })
    setFavorites([])
    setToken("")
  }

  const loginUser = async (username, password) => {

    const token = await login(username, password);
  
    localStorage.setItem('token', JSON.stringify(token));
    setToken(token);
  
    await getUserData();
  };

  const updateCart = (newItemId, price) => {
    console.log("upDate cart");
    
    setCart(prevCart => {
      const existingItem = prevCart.itemsOnOrder.find(item => item.itemId === newItemId);
  
      let updatedItems;
      let updatedTotalPrice;
  
      if (existingItem) {
        updatedItems = prevCart.itemsOnOrder.map(item =>
          item.itemId === newItemId
            ? { ...item, quantity: item.quantity + 1, price: item.price + price }
            : item
        );
        updatedTotalPrice = prevCart.total_price + price;
      } else {
        updatedItems = [...prevCart.itemsOnOrder, { itemId: newItemId, quantity: 1, price }];
        updatedTotalPrice = prevCart.total_price + price;
      }
  
      const updatedCart = {
        ...prevCart,
        itemsOnOrder: updatedItems,
        total_price: updatedTotalPrice,
      };
  
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const cleanCart = () => {
    setCart({ itemsOnOrder: [], total_price: 0 })
    localStorage.setItem('cart',JSON.stringify(cart))    
  }

  const removeItemFromCartLocal = async (newItemId,quantity, price) => {
    setCart(prevCart => {
      const updatedItems = prevCart.itemsOnOrder.map(item =>
        item.itemId === newItemId
          ? { ...item, quantity: item.quantity - quantity, price: item.price - price }
          : item
      );
  
      const newItems = updatedItems.filter(item => item.quantity > 0);
  
      const newTotal = prevCart.total_price - price;
  
      const updatedCart = {
        ...prevCart,
        itemsOnOrder: newItems,
        total_price: newTotal
      };
  
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateFavorites = (newFavorite) => {
    
    setFavorites(prevFavorites => {
      const newFavorites = [...prevFavorites, newFavorite];
      localStorage.setItem('favoritesItem', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const removeFromFavorites = (itemId) => {
    console.log(itemId);
  
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.filter(item => item !== itemId);
      console.log(newFavorites);
  
      localStorage.setItem('favoritesItem', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  useEffect(() => {
    if (token) {
      
      getUserData();  
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ currentUser, cart, favorites, loginUser , updateFavorites , updateCart, removeItemFromCartLocal,removeFromFavorites,logout,cleanCart, getUserData}}>

      {children}
    </UserContext.Provider>
  );
};

export default UserContext;