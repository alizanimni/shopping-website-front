import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/PayModal.css';
import UserContext from '../context/UserContext';
import { closeOrder } from '../services/ApiService';
function PayModal() {
    const { cart , cleanCart} = useContext(UserContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({
      idNumber: "",
      cardNumber: "",
      year: "",
      month: "",
      cvv: "",
      name: ""
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };
  

    const isValidId = /^\d{5,}$/.test(form.idNumber);
    const isValidCard = /^\d{16}$/.test(form.cardNumber.replace(/\s/g, ""));
    const isValidYear = form.year !== "";
    const isValidMonth = form.month !== "";
    const isValidCVV = /^\d{3,4}$/.test(form.cvv);
    const isValidName = form.name.trim() !== "";
  
    const isFormValid =
      isValidId &&
      isValidCard &&
      isValidYear &&
      isValidMonth &&
      isValidCVV &&
      isValidName;

      const onSubmit = async (event) => {
        event.preventDefault(); // חשוב בטופס
      
        try {
          const response = await closeOrder();
          console.log("Order closed successfully:", response.data);
          cleanCart()
          navigate("/")
        } catch (err) {
          console.error("Error closing order:", err);
        }
      };
    
  
    return (
      <div className="pay_container">
        <div className="pay_modal">
          <div className="pay-form">
            <div className="x_pay_button">
              <Link to="/cart">x</Link>
            </div>
  
            <form onSubmit={onSubmit}>
              <label>I.D. number:</label>
              <input
                name="idNumber"
                value={form.idNumber}
                onChange={handleChange}
              />
  
              <label>Card number:</label>
              <input
                name="cardNumber"
                placeholder="1234 0000 0000 0000"
                value={form.cardNumber}
                onChange={handleChange}
              />
  
              <label>Expiration date:</label>
              <div className="date">
                <label>Year</label>
                <select name="year" value={form.year} onChange={handleChange}>
                  <option value="">Year</option>
                  <option>2026</option>
                  <option>2027</option>
                  <option>2028</option>
                  <option>2029</option>
                  <option>2030</option>
                </select>
  
                <label>Month</label>
                <select name="month" value={form.month} onChange={handleChange}>
                  <option value="">Month</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
  
              <div className="cvv">
                <label>Card verification (CVV):</label>
                <input name="cvv" value={form.cvv} onChange={handleChange} />
              </div>
  
              <label>Name on card:</label>
              <input name="name" value={form.name} onChange={handleChange} />
  
              <label className="amount">
                Total amount: ${cart.total_price.toFixed(2)}
              </label>
  
              <div className="paymentButton">
                {/* <button type="submit" disabled={!isFormValid}> */}
                <button type="submit">
                  Pay
                </button>
              </div>
            </form>
            <div className="visa_div">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="visa"></img>
    <img src="data:image/png;base64,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" alt=""></img>
    <img src="data:image/png;base64,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" alt=""></img>
    <img src="https://media.licdn.com/dms/image/C560BAQFrahEecPDGlw/company-logo_200_200/0/1630567642076/american_express_israel_logo?e=2147483647&v=beta&t=EsDevCuZXupfSNNu5_wid0IEhCAJZbormDE6yS9oqXY" alt=""></img>
    
</div>
          </div>
        </div>
      </div>
    );
  }
  
  export default PayModal; 

