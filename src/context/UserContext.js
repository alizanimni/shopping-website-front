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
        console.log(userData);
        
        setCurrentUser(userData);
        localStorage.setItem('user',JSON.stringify(userData))
      
        const [cartData, favoritesData] = await Promise.all([
          fetchCart(),
          fetchFavorites()
        ]);
        console.log(cartData);
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
      }
    }
  };

  const logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('cart')
    localStorage.removeItem('favoritesItem')
    localStorage.removeItem('user')
    setCurrentUser(null)
    setCart([])
    setFavorites([])
    setToken("")
  }

  const loginUser = async (username, password) => {
    console.log("login context");
    
    try {
      const token = await login(username, password);
      console.log(token);
      
      localStorage.setItem('token', JSON.stringify(token));
      setToken(token);
      await getUserData(); 
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const updateCart = (newItemId, price) => {
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

  const removeItemFromCart = async (newItemId,price) => {
    setCart(prevCart => {
           const newCart =  prevCart.map(item=>
            item.itemId === newItemId
            ? { ...item, quantity: item.quantity + 1 ,price: item.price+price}
            : item
           )
           localStorage.setItem('cart',JSON.stringify(newCart))
           return newCart

       
          });
  };

  const updateFavorites = (newFavorite) => {
    
    setFavorites(prevFavorites => {
      const newFavorites = [...prevFavorites, newFavorite];
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
    <UserContext.Provider value={{ currentUser, cart, favorites, loginUser , updateFavorites , updateCart}}>

      {children}
    </UserContext.Provider>
  );
};

export default UserContext;