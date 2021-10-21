import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import profilePic from './../images/DefaultProfilePic.jpg'

class CreateAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                      email: "",
                      password: "",
                      repeatPassword: "",
                      displayName: "",
                      profilePic: "",
                      securityQuestion: "",
                      securityAnswer: "",
                      emailValid: true,
                      passwordValid: true,
                      repeatPasswordValid: true,
                      securityQuestionValid: true,
                      securityAnswerValid: true,
                      accountValid: true
                    };
        this.formSubmitted = false;
        this.accountError = React.createRef();
        this.emailError = React.createRef();
        this.passwordError = React.createRef();
        this.repeatPasswordError = React.createRef();
        this.securityQuestionError = React.createRef();
        this.securityAnswerError = React.createRef();
    }

   componentDidUpdate() {
        if (this.formSubmitted) {
          if (!this.state.securityAnswerValid) {
              this.securityAnswerError.current.focus();
          }
          if (!this.state.securityQuestionValid) {
              this.securityQuestionError.current.focus();
          }
          if (!this.state.repeatPasswordValid) {
              this.repeatPasswordError.current.focus();
          }
          if (!this.state.passwordValid) {
              this.passwordError.current.focus();
          }
          if (!this.state.accountValid) {
              this.accountError.current.focus();
          } 
          if (!this.state.emailValid) {
              this.emailError.current.focus();
          } 
          this.formSubmitted = false;
        }
    }

    emailIsValid = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    passwordIsValid = (pass) => {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return re.test(String(pass));
    }

    handleChange = (event) => {
      if (event.target.name !== "profilePic") {
        this.setState({[event.target.name]: event.target.value});
        return;
      } 
      if (event.target.value.length == 0) {
        this.setState({profilePic: ""});
      } else {
        const self = this;
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.addEventListener("load",function() {
            self.setState({profilePic: this.result});
        });
      }    
    }

    setDefaultDisplayName = (event) => {
      if (event.target.value.length > 0 && this.state.displayName === "") {
        this.setState({displayName: event.target.value});
      }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //Are fields valid?
        const eValid = this.emailIsValid(this.state.email);
        const pValid = this.passwordIsValid(this.state.password);
        const rpValid = (this.state.password === this.state.repeatPassword);
        const sqValid = (this.state.securityQuestion.length > 0);
        const saValid = (this.state.securityAnswer.length > 0);
        const acctAvail = (!eValid || !this.props.accountExists(this.state.email));
        if (eValid && pValid && rpValid && sqValid && saValid && acctAvail) { 
            //All fields valid: create account
            const newAccount = {
                accountData: {
                    email: this.state.email,
                    password: this.state.password,
                    securityQuestion: this.state.securityQuestion,
                    securityAnswer: this.state.securityAnswer
                },
                identityData: {
                    displayName: (this.state.displayName !== "" ? this.state.displayName : this.state.email),
                    profilePic: this.state.profilePic
                },
                speedgolfData: {
                    bio: "",
                    homeCourse: "",
                    firstRound: "",
                    personalBest: {strokes: "",minutes: "", seconds: "", course: ""},
                    clubs: {},
                    clubComments: ""
                },
                rounds: [],
                roundCount: 0
            };
            this.props.createAccountDone(newAccount);
        } else { //At least one field invalid
                 //Clear out invalid fields and display errors
            const eVal = (!eValid ? "" : this.state.email);
            const pVal = (!pValid ? "" : this.state.password);
            const rpVal = (!rpValid ? "" : this.state.repeatPassword);
            const dnVal = (this.state.displayName !== "" ? this.state.displayName : this.state.email);
            this.formSubmitted = true; //Ensures error message gets focus
            this.setState({email: eVal,
                           password: pVal,
                           repeatPassword: rpVal,
                           displayName: dnVal,
                           emailValid: eValid,
                           passwordValid: pValid,
                           repeatPasswordValid: rpValid,
                           securityQuestionValid: sqValid,
                           securityAnswerValid: saValid,
                           accountValid: acctAvail});
        }
    }

    renderErrorBox = () => {
        if (this.state.emailValid && this.state.passwordValid &&
            this.state.repeatPasswordValid && this.state.securityQuestionValid &&
            this.state.securityAnswerValid) {
            return null;
        }
        return (
        <p id="errorBox" className="alert alert-danger centered">
          {!this.state.emailValid && 
            <a id="emailError" href="#email" 
                className="alert-link" 
                ref={this.emailError}>
                Enter a valid email address<br/>
            </a>
          }
          {!this.state.accountValid && 
            <a id="accountError" href="#email" 
                className="alert-link" 
                ref={this.accountError}>
                Account with that email already exists. Choose a different email address or reset password.<br/>
            </a>
          }
          {!this.state.passwordValid && 
            <a id="passwordError" href="#password" 
                className="alert-link" 
                ref={this.passwordError}>
                Enter a valid password<br/>
            </a>
          }
          {!this.state.repeatPasswordValid && 
            <a id="repeatPasswordError" href="#repeatPassword" 
                className="alert-link" 
                ref={this.repeatPasswordError}>
                Make sure repeated password matches original password<br/>
            </a>
          }
           {!this.state.securityQuestionValid && 
            <a id="securityQuestionError" href="#securityQuestion" 
                className="alert-link" 
                ref={this.securityQuestionError}>
                Enter a security question<br/>
            </a>
          }
          {!this.state.securityAnswerValid && 
            <a id="securityAnswerError" href="#securityError" 
                className="alert-link" 
                ref={this.securityAnswerError}>
                Enter a security answer<br/>
            </a>
          }
        </p>
        );
    }

    render() {
        return (
          <div className="mode-page action-dialog" role="dialog" 
            aria-modal="true" aria-labelledby="createAccountHeader" tabIndex="0">
            <h1 id="createAccountHeader" className="mode-page-header">
              Create Account
            </h1>
            {this.renderErrorBox()}
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="mb-3 centered">
              <label htmlFor="email" className="form-label">
                Email: 
                <input id="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    onBlur={this.setDefaultDisplayName}
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
                    ref={this.password}
                    value={this.state.password}
                    onChange={this.handleChange}
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
                    value={this.state.repeatPassword}
                    onChange={this.handleChange}
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
                    value={this.state.displayName}
                    onChange={this.handleChange}
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
                     src={this.state.profilePic == "" ? profilePic :
                          this.state.profilePic} 
                    className="fm-profile-pic" height="46" width="auto"/>
                <input id="profilePic"
                   
                    onChange={this.handleChange}
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
                    ref={this.securityQuestion}
                    value={this.state.securityQuestion}
                    onChange={this.handleChange}
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
                    ref={this.securityAnswer}
                    value={this.state.securityAnswer}
                    onChange={this.handleChange}
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
                        onClick={this.props.createAccountCancel}>
                  <FontAwesomeIcon icon="window-close"/>&nbsp;Cancel
                </button>
              </div>
            </form>
        </div>
        );
    }   
}

export default CreateAccount;