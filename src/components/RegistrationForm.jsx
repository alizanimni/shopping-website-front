import React, { useContext, useEffect, useState } from 'react'
import validator from 'validator';
import '../styles/RegistrationForm.css';
import { subscribeToSite } from '../services/ApiService';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
const RegistrationForm = () => {
    const [inputClasses, setInputClasses] = useState(["", "", "", "", "","","",""]);
    const [invalidMessages, setInvalidMessages] = useState(["", "", "", "", "","","",""]);
    const [validInputs, setValidInputs] = useState([false, false, false, false, false,false,false,false]);


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [adress, setadress] = useState("");
    const [password, setPassword] = useState("");    
    const [passwordAgain, setPasswordAgain] = useState("");
    const [username, setUsername] = useState("");
    
    const placeHolders=["First name","Last name","Email","Phone","Adress","Username","Password","Repeat on password"]
     const navigate = useNavigate();

    const isFormInvalid = () => {
        return validInputs.includes(false);   
    };

    const validateInput = (
        value,
        inputindex,
        isValueValidFunc,
        setValue,
        missingValueMessage,
        invalidValueMessage
    ) => {
        const setStateOfInputs = (message, inputClass, isvalidInput) => {
            const newInavlidMessages = [...invalidMessages];
            const newInputClasses = [...inputClasses];
            const newValidInputs = [...validInputs];
            newInavlidMessages[inputindex] = message;
            setInvalidMessages(newInavlidMessages);
            newInputClasses[inputindex] = inputClass;
            setInputClasses(newInputClasses);
            newValidInputs[inputindex] = isvalidInput;
            setValidInputs(newValidInputs);
        };

        if (value.length > 0) {
            if (isValueValidFunc(value)) {
                setStateOfInputs("", "", true);
                setValue(value);
            } else {
                setStateOfInputs(invalidValueMessage, "input-invalid", false);
            }
        } else {
            setStateOfInputs(missingValueMessage, "input-invalid", false);
        }
    };


    const onBlurFirstname = (event) => {
        const newFirstname = event.target.value.trim();
        const isFirstnamevalid = (value) => {
            return value.length>0;
        };
        validateInput(
            newFirstname,
            0,
            isFirstnamevalid,
            setFirstName,
            "You must enter first name",
            "Invalid name"
        );
    };

    const onBlurLastname = (event) => {
        const newLastname = event.target.value.trim();
        const isLastnamevalid = (value) => {
            return value.length>0;
        };
        validateInput(
            newLastname,
            1,
            isLastnamevalid,
            setLastName,
            "You must enter Last name",
            "Invalid last name"
        );
    };

    const onBlurEmail = (event) => {
        const newEmail = event.target.value.trim();

        validateInput(
            newEmail,
            2,
            validator.isEmail,
            setEmail,
            "You must enter your email",
            "Invalid email"
        );
    };

    const onBlurPhone = (event) => {
        const newPhone = event.target.value.trim();
        const isPhonevalid = (value) => {
            return /^[0-9]{10}$/.test(value);
        };
        validateInput(
            newPhone,
            3,
            isPhonevalid,
            setPhone,
            "You must enter your Phone",
            "Invalid phone number"
        );
    };


    const onBlurAdress = (event) => {
        const newAdress = event.target.value.trim();
        const isAdressValid = (value) => {
            return value.length>5;
        };
        validateInput(
            newAdress,
            4,
            isAdressValid,
            setadress,
            "You must enter your adress",
            "Adress invalid"
        );
    };

    const onBlurUsername = (event) => {
        const newUsername = event.target.value.trim();
        const isUsenamevalid = (value) => {
            return value.toLowerCase() !== "moshe";
        };
        validateInput(
            newUsername,
            5,
            isUsenamevalid,
            setUsername,
            "You must enter username",
            "Username could not be MOSHE!!!"
        );
    };



    const onBlurPassword = (event) => {
        const newPassword = event.target.value.trim();
        const isPasswordValid = (value) => {
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
            return passwordRegex.test(value);
        };
        validateInput(
            newPassword,
            6,
            isPasswordValid,
            setPassword,
            "You must enter password",
            "Password must contain capital and regular characters, numbers and must have at least 6 characters"
        );
        console.log(password);
    };

    const onBlurPasswordRepeated = (event) => {
        const passwordRepeated = event.target.value.trim();
        const isPasswordRepeatedValid = (value) => {
            return password === passwordRepeated;
        };
        validateInput(
            passwordRepeated,
            7,
            isPasswordRepeatedValid,
            () => { },
            "You must enter again your password",
            "The two passwords not identical"
        );
    };

    const onSubmitform = (event) => {
        event.preventDefault();
        console.log("subscribeForm", {
            firstName,
            lastName,
            phone,
            username,
            adress,
            email,
            password
        });
            subscribeToSite(firstName,lastName,email,phone,adress,username, password).
        then(()=>{navigate("/login")}).catch((err) => {
                    console.log(err.response.data);
                if (err.response.data ==="Email already exists") {
                    setEmail("");
                    setInvalidMessages(["", "", "Mail alrady exist", "", "","","",""]);
                    setValidInputs([true, true, false, true, true, true, true,true]);
                    alert("Mail alrady exist in our system")
                }else if(err.response.data ==="Username already exists"){
                    setUsername("");
                    setInvalidMessages(["", "", "", "", "","Username alrady exist","",""]);
                    setValidInputs([true, true, true, true, true, false, true,true]);
                    alert("Username alrady exist please change")
                }
                })          
        }



    return (
        <div className="subscribe_container">
        <div className="subscribe_modal">
        <div className="login-form">
          <h3>Subscribe</h3>
            <form onSubmit={ onSubmitform }>
<div className='name-container'>
            <span className='input-container'>
                <label>First name</label>    
                <input placeholder={placeHolders[0]} className={ inputClasses[0] } value={firstName} onChange={(event)=>{setFirstName(event.target.value)}} onBlur={ onBlurFirstname }></input>
                {invalidMessages[0] !== "" && <div className="invalid-message-name">{ invalidMessages[0] }</div>}
            </span>

            <span className='input-container'>
                <label>Last name</label>                
                <input placeholder={placeHolders[1]} type="text" className={ inputClasses[1] } value={lastName} onChange={(event)=>{setLastName(event.target.value)}} onBlur={ onBlurLastname } />
                {invalidMessages[1] !== "" && <div className="invalid-message-name">{ invalidMessages[1] }</div> }
                </span>
</div>
                <span className='input-container'>
                <label>Email</label>
                <input placeholder={placeHolders[2]} className={ inputClasses[2] } value={email} onChange={(event)=>{setEmail(event.target.value)}} onBlur={ onBlurEmail } />
                { invalidMessages[2] !== "" && <div className="invalid-message">{ invalidMessages[2] }</div> }
                </span>

                <span className='input-container'>
                <label>Phone</label>
                <input type='number' placeholder={placeHolders[3]} className={ inputClasses[3] } value={phone} onChange={(event)=>{setPhone(event.target.value)}} onBlur={ onBlurPhone } />
                { invalidMessages[3] !== "" && <div className="invalid-message">{ invalidMessages[3] }</div> }
                </span>

            <span className='input-container'>
                <label>Adress</label>                
                <input placeholder={placeHolders[4]} type="text" className={ inputClasses[4] } value={adress} onChange={(event)=>{setadress(event.target.value)}} onBlur={ onBlurAdress } />
                {invalidMessages[4] !== "" && <div className="invalid-message">{ invalidMessages[4] }</div> }
                </span>

                <span className='input-container'>
                <label>User name</label>    
                <input placeholder={placeHolders[5]} className={ inputClasses[5] } value={username} onChange={(event)=>{setUsername(event.target.value)}} onBlur={ onBlurUsername }></input>
                {invalidMessages[5] !== "" && <div className="invalid-message">{ invalidMessages[5] }</div>}
            </span>

      <span className='input-container'>
                <label>Password</label>
                <input type="password" placeholder={placeHolders[6]} className={ inputClasses[6] } value={password} onChange={(event)=>{setPassword(event.target.value)}} onBlur={ onBlurPassword } />
                {  invalidMessages[6] !== "" && <div className="invalid-message">{ invalidMessages[6] }</div> }
                </span>

                <span className='input-container'>
                <label>Password again</label>
                <input type="password" placeholder={placeHolders[7]} className={ inputClasses[7] } value={passwordAgain} onChange={(event)=>{setPasswordAgain(event.target.value)}}  onBlur={ onBlurPasswordRepeated } />
                { invalidMessages[7] !== "" && <div className="invalid-message">{ invalidMessages[7] }</div> }
                </span>

                <div className="login-form__nav">
                    <button type='submit' disabled={ isFormInvalid() }>Sign up</button>
                </div>
            </form>
        </div>
        </div>
        </div>
    );
}

export default RegistrationForm;