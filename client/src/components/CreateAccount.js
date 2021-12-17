import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import defaultProfilePic from './../images/DefaultProfilePic.jpg'

function CreateAccount(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [repeatPasswordValid, setRepeatPasswordValid] = useState(true);
    const [securityQuestionValid, setSecurityQuestionValid] = useState(true);
    const [securityAnswerValid, setSecurityAnswerValid] = useState(true);
    const [accountValid, setAccountValid] = useState(true);

    const formSubmitted = false;
    const accountError = React.createRef();
    const emailError = React.createRef();
    const passwordError = React.createRef();
    const repeatPasswordError = React.createRef();
    const securityQuestionError = React.createRef();
    const securityAnswerError = React.createRef();

    useEffect(() => {
        if (formSubmitted) {
          if (!securityAnswerValid) {
              securityAnswerError.current.focus();
          }
          if (!securityQuestionValid) {
              securityQuestionError.current.focus();
          }
          if (!repeatPasswordValid) {
              repeatPasswordError.current.focus();
          }
          if (!passwordValid) {
              passwordError.current.focus();
          }
          if (!accountValid) {
              accountError.current.focus();
          } 
          if (!emailValid) {
              emailError.current.focus();
          } 
          formSubmitted = false;
        }
      });

    const emailIsValid = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const passwordIsValid = (pass) => {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return re.test(String(pass));
    }

    const handleChange = (event) => {
      if (event.target.name !== "profilePic") {
        if (event.target.name == "email") {
          setEmail(event.target.value);
        }
        else if (event.target.name == "password") {
          setPassword(event.target.value);
        }
        else if (event.target.name == "repeatPassword") {
          setRepeatPassword(event.target.value);
        }
        else if (event.target.name == "displayName") {
          setDisplayName(event.target.value);
        }
        else if (event.target.name == "securityQuestion") {
          setSecurityQuestion(event.target.value);
        }
        else if (event.target.name == "securityAnswer") {
          setSecurityAnswer(event.target.value);
        }
        return;
      } 
      if (event.target.value.length == 0) {
        setProfilePic("");
      } else {
        const self = this;
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.addEventListener("load",function() {
            self.setState({profilePic: reader.result});
        });
      }    
    }

    const setDefaultDisplayName = (event) => {
      if (event.target.value.length > 0 && displayName === "") {
        setDisplayName(event.target.value);
      }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        //Are fields valid?
        const eValid = emailIsValid(email);
        const pValid = passwordIsValid(password);
        const rpValid = (password === repeatPassword);
        const sqValid = (securityQuestion.length > 0);
        const saValid = (securityAnswer.length > 0);
        const acctAvail = !(await props.accountExists(email));
        if (eValid && pValid && rpValid && sqValid && saValid && acctAvail) { 
            //All fields valid: create account
            const newAccount = {
                accountData: {
                    id: email,
                    password: password,
                    securityQuestion: securityQuestion,
                    securityAnswer: securityAnswer
                },
                identityData: {
                    displayName: (displayName !== "" ? displayName : email),
                    profilePic: profilePic
                },
                speedgolfData: {
                    bio: "",
                    homeCourse: "",
                    firstRound: "",
                    personalBest: {},
                    clubs: {},
                    clubComments: ""
                }
            };
            props.createAccountDone(newAccount);
        } else { //At least one field invalid
                 //Clear out invalid fields and display errors
            const eVal = (!eValid ? "" : email);
            const pVal = (!pValid ? "" : password);
            const rpVal = (!rpValid ? "" : repeatPassword);
            const dnVal = (displayName !== "" ? displayName : email);
            formSubmitted = true; //Ensures error message gets focus
            setEmail(eVal);
            setPassword(pVal);
            setRepeatPassword(rpVal);
            setDisplayName(dnVal);
            setEmailValid(eValid);
            setPasswordValid(pValid);
            setRepeatPasswordValid(rpValid);
            setSecurityQuestionValid(sqValid);
            setSecurityAnswerValid(saValid);
            setAccountValid(acctAvail);
        }
    }

    const renderErrorBox = () => {
        if (emailValid && passwordValid &&
            repeatPasswordValid && securityQuestionValid &&
            securityAnswerValid) {
            return null;
        }
        return (
        <p id="errorBox" className="alert alert-danger centered">
          {!emailValid && 
            <a id="emailError" href="#email" 
                className="alert-link" 
                ref={emailError}>
                Enter a valid email address<br/>
            </a>
          }
          {!accountValid && 
            <a id="accountError" href="#email" 
                className="alert-link" 
                ref={accountError}>
                Account with that email already exists. Choose a different email address or reset password.<br/>
            </a>
          }
          {!passwordValid && 
            <a id="passwordError" href="#password" 
                className="alert-link" 
                ref={passwordError}>
                Enter a valid password<br/>
            </a>
          }
          {!repeatPasswordValid && 
            <a id="repeatPasswordError" href="#repeatPassword" 
                className="alert-link" 
                ref={repeatPasswordError}>
                Make sure repeated password matches original password<br/>
            </a>
          }
           {!securityQuestionValid && 
            <a id="securityQuestionError" href="#securityQuestion" 
                className="alert-link" 
                ref={securityQuestionError}>
                Enter a security question<br/>
            </a>
          }
          {!securityAnswerValid && 
            <a id="securityAnswerError" href="#securityError" 
                className="alert-link" 
                ref={securityAnswerError}>
                Enter a security answer<br/>
            </a>
          }
        </p>
        );
    }

    return (
      <div className="mode-page action-dialog" role="dialog" 
        aria-modal="true" aria-labelledby="createAccountHeader" tabIndex="0">
        <h1 id="createAccountHeader" className="mode-page-header">
          Create Account
        </h1>
        {renderErrorBox()}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3 centered">
          <label htmlFor="email" className="form-label">
            Email: 
            <input id="email"
                value={email}
                onChange={handleChange}
                onBlur={setDefaultDisplayName}
                className="form-control centered"
                name="email"
                type="email"
                size="35"
                aria-describedby="emailDescr"
            />
          </label>
          <div id="emailDescr" className="form-text">
            Enter a valid email address
            </div>
          </div>
          <div className="mb-3 centered">
          <label htmlFor="password" className="form-label">
            Password:
            <input id="password"
                //ref={password}
                value={password}
                onChange={handleChange}
                className="form-control centered"
                name="password"
                type="password"
                size="35"
                aria-describedby="passwordDescr"
            />
          </label>  
          <div id="passwordDescr" className="form-text">
            Password must be at least eight characters with at least one upper case letter, one upper case letter, and one number
            </div>
          </div>
          <div className="mb-3 centered">
          <label htmlFor="repeatPassword" className="form-label">
            Repeat Password:
            <input id="repeatPassword"
                value={repeatPassword}
                onChange={handleChange}
                className="form-control centered"
                name="repeatPassword"
                type="password"
                size="35"
                aria-describedby="repeatPasswordDescr"
            />
          </label>
          <div id="repeatPasswordDescr" className="form-text">
            Repeated password must exactly match original password
          </div>
          </div>
          <div className="mb-3 centered">
          <label htmlFor="displayName" className="form-label">
            Display Name:
            <input id="displayName"
                value={displayName}
                onChange={handleChange}
                className="form-control centered"
                name="displayName"
                type="text"
                size="35"
                aria-describedby="displayNameDescr"
            />
          </label>
          <div id="displayNameDescr" className="form-text">
            Your name within the app (defaults to your email)
          </div>
          </div>
          <div className="mb-3 centered">
          <label htmlFor="profilePic" className="form-label">
            Profile Picture:<br/>
            <img id="acctProfilePicImage" 
                 src={profilePic == "" ? defaultProfilePic :
                      profilePic} 
                className="fm-profile-pic" height="46" width="auto"/>
            <input id="profilePic"
               
                onChange={handleChange}
                className="form-control centered"
                name="profilePic"
                type="file"
                accept=".png, .gif, .jpg"
                aria-describedby="profilePicDescr"
            />
          </label>
          <div id="profilePicDescr" className="form-text">
            A profile picture that represents you in the app (defaults to a generic picture)
          </div>
          </div>
          <div className="mb-3 centered">
          <label htmlFor="securityQuestion" className="form-label">
            Security Question:
            <textarea id="securityQuestion"
                //ref={securityQuestion}
                value={securityQuestion}
                onChange={handleChange}
                className="form-control centered"
                name="securityQuestion"
                size="35"
                rows="2"
                cols="35"
                maxLength="100"
                aria-describedby="securityQuestionDescr"
            />
          </label>
          <div id="securityQuestionDescr" className="form-text">
            Enter a question whose answer you can easily remember
          </div>
          </div>
          <div className="mb-3 centered">
          <label htmlFor="securityAnswer" className="form-label">
            Answer to Security Question:
            <textarea id="securityAnswer"
                //ref={securityAnswer}
                value={securityAnswer}
                onChange={handleChange}
                className="form-control centered"
                name="securityAnswer"
                type="text"
                rows="2"
                cols="35"
                maxLength="100"
                aria-describedby="securityAnswerDescr"
                required={true}
            />
          </label>
          <div id="securityAnswerDescr" className="form-text">
            Enter an easily remembered answer to the security question
          </div>
          </div>
          <div className="mode-page-btn-container">
            <button type="submit" className="mode-page-btn action-dialog action-button">
                <FontAwesomeIcon icon="user-plus"/>
                &nbsp;Create Account
            </button>
            <button type="button" 
                    className="mode-page-btn-cancel action-dialog cancel-button"
                    onClick={props.createAccountCancel}>
              <FontAwesomeIcon icon="window-close"/>&nbsp;Cancel
            </button>
          </div>
        </form>
    </div>
    ); 
}

export default CreateAccount;