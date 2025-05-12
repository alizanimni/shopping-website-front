import { createContext, useState, useEffect, useContext } from 'react';
import { getItems } from '../services/ApiService';

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedItems = localStorage.getItem('items');
   console.log(JSON.parse(savedItems));
   localStorage.removeItem("itemsAdjusted")
    // if (savedItems) {
    //   console.log("saved");
      
    //   const parsedItems = JSON.parse(savedItems);
    //   setItems(parsedItems);
      
    // } else {
      getItems()
        .then((data) => {
          setItems(data);
          localStorage.setItem('items', JSON.stringify(data));
        })
        .catch(err => console.log(err));
    // }
  }, []);

  const uptadeItemsSpair=(itemId,add)=>{
    console.log("update items");
    
    setItems(prevItems=>{
      var newItems = [...prevItems]
      newItems[itemId-1].item_quantity=newItems[itemId-1].item_quantity+add
      localStorage.setItem('items',JSON.stringify(newItems))
      return newItems
    })
  }

 const setItemsSpairFirstTime=(ItemsOncart)=>{
  console.log(ItemsOncart);
  
    if(ItemsOncart.length>0){
      setItems(prevItems=>{
        console.log(prevItems);
        
        var updateItems = [...prevItems]
        ItemsOncart.map((item)=>{
          console.log(item);
          
            updateItems[item.itemId-1].item_quantity = prevItems[item.itemId-1].item_quantity-item.quantity
        })
        console.log(prevItems);
        
        console.log(updateItems);
        localStorage.setItem('items',JSON.stringify(updateItems))
        return updateItems
      })      
    }

  }

  return (
    <ItemsContext.Provider value={{ items ,setItemsSpairFirstTime,uptadeItemsSpair}}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => useContext(ItemsContext);