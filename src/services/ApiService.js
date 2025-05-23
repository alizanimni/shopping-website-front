import axios from 'axios';

const API_URL = "http://localhost:9000";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    const tokenValue = token ? JSON.parse(token).jwt : null;
    return { 'Authorization': `Bearer ${tokenValue}` };
}

export const getItems =async()=>{
        const response = await axios.get(`${API_URL}/item/all`);
        return response.data;

}

export const subscribeToSite = async (firstName, lastName, email, phone, adress, username, password) => {
        const response = await axios.post(`${API_URL}/users/register`, {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "phone": phone,
            "address": adress,
            "username": username,
            "password": password
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response.data);
        
        return response.data;
};

export const fetchUser =()=>{
        return axios.get(`${API_URL}/users`, { headers: getAuthHeaders() });
}

export const fetchCart =()=>{
      return axios.get(`${API_URL}/cart`, { headers: getAuthHeaders() })
}

export const fetchFavorites=()=>{
    return axios.get(`${API_URL}/item/favorites`, { headers: getAuthHeaders() })
   
}
export const login =async(username,password)=>{
    console.log(username,password);
    
        const response = await axios.post(`${API_URL}/authenticate`, {
            "username": username,
            "password": password
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response.data);
        
        return response.data;
}

export const addItemToFavorite=async(itemId)=>{
    console.log(`${API_URL}/item/add-to-favorite/${itemId}`);
    
        try {
            const response = await axios.post(
                `${API_URL}/item/add-to-favorite/${itemId}`,
                null, 
               { headers: getAuthHeaders() }
            );
            return response.data;
        } catch (err) {
            console.error("Error adding item to favorite:", err);
            throw err;
        }
    
    
}

  export const removeItemFromFavoriteDB = async(itemId)=>{
    const response = await axios.delete(
        `${API_URL}/item/favorites/${itemId}`,
       { headers: getAuthHeaders() }
    );
    return response.data;
  }


export const addItemToCart = async (itemId, quantity, price) => {
    console.log(itemId, quantity, price);
    
    const response = await axios.post(`${API_URL}/cart/add-item`, 
      { itemId, quantity, price }, 
      { headers: { 
          'Content-Type': 'application/json', 
          ...getAuthHeaders() 
        } 
      }
    );
    return response.data;
  };

  export const removeItemFromCart = async (itemId, quantity, price) => {
    console.log(price);
    
    console.log(quantity);
    
    const response = await axios.delete(`${API_URL}/cart/decrease-item`, {
      data: { itemId, quantity, price },
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      }
    });
    return response.data;
  };

  export const closeOrder = () => {
    return axios.put(`${API_URL}/cart`, null, {
      headers: getAuthHeaders()
    });
  };

  export const deleteUser = async()=>{
    const response = await axios.delete(
        `${API_URL}/users`,
       { headers: getAuthHeaders() }
    );
    return response.data;
  }

  export const updateUserDetails=async(firstName,lastName,email,address,phone)=>{
    const response = await axios.put(`${API_URL}/users`, {
        "first_name": firstName,
         "last_name": lastName,
         email,
         address,
         phone       
    }, {
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        }
    });
    console.log(response.data);
    
    return response.data;
  }

  export const fetchAllClosedOrders=()=>{
    return axios.get(`${API_URL}/cart/all`, { headers: getAuthHeaders() })
  }
  
