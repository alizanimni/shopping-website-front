import { createContext, useState, useEffect, useContext } from 'react';
import { getItems } from '../services/ApiService';

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems()
      .then((data) => {
        setItems(data)
      localStorage.setItem('items',JSON.stringify(data))
    }).catch(err => console.log(err));
  }, []);

  return (
    <ItemsContext.Provider value={{ items }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => useContext(ItemsContext);