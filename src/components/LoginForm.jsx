import React, { useContext, useState } from 'react'
import '../styles/LoginForm.css';
import { login } from '../services/ApiService';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';



const LoginForm = () => {
  const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isUserNameinputValid, setIsUserNameInputValid] = useState(false);
	const [isPasswordInputValid, setIsPasswordInputValid] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
    const {loginUser} = useContext(UserContext);

	const onBlurUsernameInput = (event) => {
    const theUsername = event.target.value.trim();
    console.log(theUsername);
    
     if(theUsername.length>0){
      setIsUserNameInputValid(true);
      setUsername(theUsername)
     }
	};


	const onBlurPasswordInput = (event) => {
		const thePassword = event.target.value.trim();
		setPassword(thePassword === "" ? "" : thePassword);
		setIsPasswordInputValid(thePassword !== "");
    
	};



	const onSubmit = async (event) => {
		event.preventDefault();
		try {
		  await loginUser(username, password);
		  navigate('/');
		} catch (error) {
		  console.error('Login failed', error);
		  alert('ההתחברות נכשלה');
		}
	  };
    
       
    

	

	const onClickSignUp = () => {

		navigate("/registration")
	};

	return (
		<div className="login_page">
            <div className="login_container drop-shadow-lg">
        
			<h2>Login</h2>
			{errorMessage !== "" && <div className="error-message">{ errorMessage }</div> }


      <form onSubmit={ onSubmit } className="login_form">
				<input placeholder="Username" onBlur={ onBlurUsernameInput } />
				{ !isUserNameinputValid && <div className="invalid-message">You must enter your email.</div> }

				<input type="password" placeholder="Password" onBlur={ onBlurPasswordInput } />
				{ !isPasswordInputValid && <div className="invalid-message">You must enter your password.</div> }

				<div className="login_submit">
					<button type="submit" disabled={!isPasswordInputValid||!isUserNameinputValid}>Submit</button>
				</div>
          <div>New here?					<span className="create-account-button" onClick={onClickSignUp}>Craete account</span></div>                
			</form>
            </div>
		</div>
	);
}

export default LoginForm;