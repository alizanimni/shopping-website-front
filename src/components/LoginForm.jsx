import React, { useContext, useState } from 'react'
import '../styles/LoginForm.css';
import { login } from '../services/ApiService';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';



const LoginForm = () => {
  const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isUserNameinputValid, setIsUserNameInputValid] = useState(true);
	const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
    const {loginUser} = useContext(UserContext);
	const onBlurUsernameInput = (event) => {
    const theUsername = event.target.value.trim();
    console.log(theUsername);
	if(errorMessage!=="") setErrorMessage("")
     if(theUsername.length>1){
      setIsUserNameInputValid(true);
      setUsername(theUsername)
     }else{
		setIsUserNameInputValid(false);
	 }

	};


	const onBlurPasswordInput = (event) => {
		if(errorMessage!=="") setErrorMessage("")
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
		console.log(error.response.data);
		if(error.response.data==="Incorrect Username Or Password")

			setErrorMessage("Incorrect username or password.")
		
		  console.error('Login failed', error);
		}
	  };
    
       
    

	

	const onClickSignUp = () => {

		navigate("/registration")
	};

	return (
		<div className="login_page">
            <div className="login_container drop-shadow-lg">
        
			<h2>Login</h2>


      <form onSubmit={ onSubmit } className="login_form">
				<input placeholder="Username" onBlur={ onBlurUsernameInput } />
				{ !isUserNameinputValid && <div className="invalid-message-login">You must enter your username.</div> }

				<input type="password" placeholder="Password" onBlur={ onBlurPasswordInput } />
				{ !isPasswordInputValid && <div className="invalid-message-login">You must enter your password.</div> }
                { errorMessage!== "" && <div className='error-message-login'>{errorMessage}</div>}
				<div className="login_submit">
					<button type="submit" disabled={!isPasswordInputValid||!isUserNameinputValid && password===""||username===""}>Submit</button>
				</div>
          <div>New here?					<span className="create-account-button" onClick={onClickSignUp}>Craete account</span></div>                
			</form>
            </div>
		</div>
	);
}

export default LoginForm;