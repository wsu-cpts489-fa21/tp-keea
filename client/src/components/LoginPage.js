import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import CreateAccount from './CreateAccount.js';

/*
   LoginPage function returns the html for information
   about the Login Page. LoginPage has been reimplemented
   to support React hooks.
*/

function LoginPage(props) {

        const emailError = React.createRef();
        const passwordError = React.createRef();
        const accountError = React.createRef();
        const email = React.createRef();
        const password = React.createRef();
       
        const [emailValid, setEmailValid] = useState(true);
        const [passwordValid, setPasswordValid] = useState(true);
        const [accountValid, setAccountValid] = useState(true);
        const [showCreateAccount, setShowCreateAccount] = useState(false);
        const [showAccountCreated, setShowAccountCreated] = useState(false);
        const [accountCreatedResult, setAccountCreatedResult] = useState("");
        const [loginBtnIcon, setLoginBtnIcon] = useState("sign-in");
        const [loginBtnLabel, setLoginBtnLabel] = useState("Log In");
        const [githubIcon, setGithubIcon] = useState(['fab','github']);
        const [githubLabel, setGithubLabel] = useState("Sign in with GitHub");
        const [googleIcon, setGoogleIcon] = useState(['fab', 'google']);
        const [googleLabel, setGoogleLabel] = useState("Sign in with Google");
    
    useEffect(() => {
        if (showCreateAccount) {
            return;
        }
        if (!accountValid) {
            email.current.value = "";
            password.current.value = "";
            accountError.current.focus();
        }
        if (!passwordValid) {
            password.current.value = "";
            passwordError.current.focus();
        }
        if (!emailValid) {
            email.current.value = "";
            emailError.current.focus();
        } 
      });

    const handleSubmit = (e) => {
        e.preventDefault();
            //Is the email field valid
            const eValid = !email.current.validity.typeMismatch && 
                            !email.current.validity.valueMissing;
            //Is the password field valid?
            const pValid = !password.current.validity.patternMismatch && 
                            !password.current.validity.valueMissing;
        if (!eValid || !pValid) {
            setEmailValid(eValid);
            setPasswordValid(pValid);
            setAccountValid(true);
            return;
        }
        //Can we log in user?
        const emailHold = email.current.value;
        const pwHold = password.current.value;
        setLoginBtnIcon('spinner');
        setLoginBtnLabel('Logging In...');
        handleSubmitCallback(eValid,pValid,emailHold, pwHold);
    }

    const handleSubmitCallback = async(eValid, pValid,email,password) => {
        const aValid = await props.authenticateUser(email,password);
        if (aValid) {
            window.open('/', '_self'); //App.componentDidMount() takes it from here
        } else { //at least one field is invalid--trigger re-render of LoginPage component
            setEmailValid(eValid);
            setPasswordValid(pValid);
            setAccountValid(aValid);
            setLoginBtnIcon("sign-in");
            setLoginBtnLabel("Log In");
        } 
    }

    const handleOAuthLogin = (provider) => {
        window.open(`/auth/${provider}`,"_self");
    }
    
    const handleOAuthLoginClick = (provider) => {
        if(provider === "github")
        {
            setGithubIcon("spinner");
            setGithubLabel("Connecting...");
        }
        else
        {
            setGoogleIcon("spinner");
            setGoogleLabel("Connecting...");
        }
        setTimeout(() => handleOAuthLogin(provider),1000);
     }
     
    const createAccountDone = async (data) => {
        const result = await props.createAccount(data);
        setShowCreateAccount(false);
        setShowAccountCreated(true);
        setAccountCreatedResult(result);
    }

    const createAccountCancel = () => {
        setShowCreateAccount(false);
    }

    const renderErrorBox = () => {
      return (
        emailValid && passwordValid && accountValid ? null:
          <p id="errorBox" className="alert alert-danger centered">
            {!emailValid && 
                <a id="emailError" href="#email" 
                    className="alert-link" 
                    ref={emailError}>
                    Enter a valid email address<br/>
                </a>
            }
            {!passwordValid &&
              <a id="passwordError" 
                href="#password" 
                className="alert-link" 
                ref={passwordError}>
                Enter a valid password<br/>
              </a>
            }
            {!accountValid && 
              <a id="accountError" 
                href="#email" 
                className="alert-link" 
                ref={accountError}>
                No account with that email and password exists. Re-enter credentials or create an account.
              </a>
            }
          </p>
      );
    }
       
    return(showCreateAccount ?
        <CreateAccount 
            createAccount = {props.createAccount}
            accountExists = {props.accountExists}
            createAccountDone = {createAccountDone} 
            createAccountCancel = {createAccountCancel}/> :
        <div id="loginPage" className="mode-page">
            <h1 className="mode-page-header">Log In</h1>
            {showAccountCreated && 
                <div id="accountCreated" className="toast-container" 
                    role="alert" aria-atomic="true" aria-live="assertive">
                <div className="toast-text">
                    {accountCreatedResult}
                </div>
                <button id="accountCreatedClose" 
                        type="button" 
                        className="btn-close toast-close" 
                        aria-label="Close"
                        onClick={() => setShowAccountCreated(false)}>
                        <span aria-hidden="true">&times;</span>
                </button>
                </div>
            }
            {renderErrorBox()}
            <form id="loginForm" className="centered" 
                onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:<br/>
                    <input id="email" type="email" className="form-control-lg centered"
                        aria-describedby="emailDescr"
                        ref={email} required/>
                </label>
                <div id="emailDescr" className="form-text">
                    Enter a valid email address.
                </div>
                </div>
                <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:<br/>
                    <input id="password" type="password" className="form-control-lg centered"
                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                        aria-describedby="passwordDescr"
                        ref={password} required />
                </label>
                <div id="passwordDescr" className="form-text">
                    Passwords must be at least 8 characters long with at least one number, 
                    one lower case letter, and one upper case letter.
                </div>
                </div>
            <p></p>
            <button type="submit" id="loginBtn" 
                    className="btn btn-primary fm-primary-btn">                    
                    <FontAwesomeIcon icon={loginBtnIcon}
                                        className={loginBtnIcon == "spinner" ? "fa-spin" : ""}/>
                    &nbsp;{loginBtnLabel}
            </button>
            </form>
            <ul className="nav justify-content-center">
            <li className="nav-item">
                <button id="createAccountBtn" className="nav-link btn btn-link"
                    onClick={() => setShowCreateAccount(true)}>
                    Create Account
                </button>
            </li>
            <li className="nav-item">
                <button id="resetPasswordBtn" className="nav-link btn btn-link">Reset Password</button>
            </li>
            </ul>
            <div className="centered">
            <button type="button" className="btn btn-github"
                onClick={() => handleOAuthLoginClick("github")}>
                <FontAwesomeIcon icon={githubIcon} 
                                className={githubIcon == "spinner" ? "fa-spin" : ""}/>
                &nbsp;{githubLabel}
            </button>
            &nbsp;
            <button type="button" className="btn btn-google"
                onClick={() => handleOAuthLoginClick("google")}>
                <FontAwesomeIcon icon={googleIcon} 
                                className={googleIcon == "spinner" ? "fa-spin" : ""}/>
                &nbsp;{googleLabel}
            </button>
            </div>
        </div>  
    )
}

export default LoginPage;