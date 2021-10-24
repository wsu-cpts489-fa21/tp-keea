import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import AppMode from './AppMode.js'
import CreateAccount from './CreateAccount.js';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.emailError = React.createRef();
        this.passwordError = React.createRef();
        this.accountError = React.createRef();
        this.email = React.createRef();
        this.password = React.createRef();
        this.state = {emailValid: true, 
                      passwordValid: true,
                      accountValid: true,
                      showCreateAccount: false,
                      showAccountCreated: false,
                      accountCreatedEmail: ""};
    }

    componentDidUpdate() {
        if (this.state.showCreateAccount) {
            return;
        }
        if (!this.state.accountValid) {
            this.email.current.value = "";
            this.password.current.value = "";
            this.accountError.current.focus();
        }
        if (!this.state.passwordValid) {
            this.password.current.value = "";
            this.passwordError.current.focus();
        }
        if (!this.state.emailValid) {
            this.email.current.value = "";
            this.emailError.current.focus();
        } 
    } 

    handleSubmit = (e) => {
        e.preventDefault();
         //Is the email field valid
         const eValid = !this.email.current.validity.typeMismatch && 
                          !this.email.current.validity.valueMissing;
         //Is the password field valid?
         const pValid = !this.password.current.validity.patternMismatch && 
                            !this.password.current.validity.valueMissing;
        //Is account valid?
        const aValid = eValid && pValid && this.props.accountValid(this.email.current.value,this.password.current.value);
        if (eValid && pValid && aValid) {
            this.props.logInUser(this.email.current.value);
        } else { //at least one field is invalid--trigger re-render
            this.setState({emailValid: eValid,
                           passwordValid: pValid,
                           accountValid: aValid});
        }
    }

    createAccountDone = (data) => {
        this.props.createAccount(data);
        this.setState({showCreateAccount: false,
                       showAccountCreated: true,
                        accountCreatedEmail: data.accountData.email});
    }

    createAccountCancel = () => {
        this.setState({showCreateAccount: false});
    }

    renderErrorBox = () => {
      return (
        this.state.emailValid && this.state.passwordValid && this.state.accountValid ? null:
          <p id="errorBox" className="alert alert-danger centered">
            {!this.state.emailValid && 
                <a id="emailError" href="#email" 
                    className="alert-link" 
                    ref={this.emailError}>
                    Enter a valid email address<br/>
                </a>
            }
            {!this.state.passwordValid &&
              <a id="passwordError" 
                href="#password" 
                className="alert-link" 
                ref={this.passwordError}>
                Enter a valid password<br/>
              </a>
            }
            {!this.state.accountValid && 
              <a id="accountError" 
                href="#email" 
                className="alert-link" 
                ref={this.accountError}>
                No account with that email and password exists. Re-enter credentials or create an account.
              </a>
            }
          </p>
      );
    }
       
    render() {
        return(this.state.showCreateAccount ?
            <CreateAccount 
              createAccount = {this.props.createAccount}
              accountExists = {this.props.accountExists}
              accountValid = {this.props.accountValid}
              createAccountDone = {this.createAccountDone} 
              createAccountCancel = {this.createAccountCancel}/> :
            <div id="loginPage" className="mode-page">
                <h1 className="mode-page-header">Log In</h1>
                {this.state.showAccountCreated && 
                  <div id="accountCreated" className="toast-container" 
                       role="alert" aria-atomic="true" aria-live="assertive">
                  <div className="toast-text">
                     {"New account created with email " + this.state.accountCreatedEmail + "."}
                  </div>
                    <button id="accountCreatedClose" 
                            type="button" 
                            className="btn-close toast-close" 
                            aria-label="Close"
                            onClick={() => this.setState({showAccountCreated: false,
                                                          accountCreatedEmail: ""})}>
                           <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                }
                {this.renderErrorBox()}
                <form id="loginForm" className="centered" 
                    onSubmit={this.handleSubmit} noValidate>
                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:<br/>
                        <input id="email" type="email" className="form-control-lg centered"
                            aria-describedby="emailDescr"
                            ref={this.email} required/>
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
                            ref={this.password} required />
                    </label>
                    <div id="passwordDescr" className="form-text">
                        Passwords must be at least 8 characters long with at least one number, 
                        one lower case letter, and one upper case letter.
                    </div>
                    </div>
                <p></p>
                <button type="submit" id="loginBtn" 
                        className="btn btn-primary fm-primary-btn">
                    <FontAwesomeIcon icon="sign-in-alt"/>
                        &nbsp;Log In
                </button>
                </form>
                <ul className="nav justify-content-center">
                <li className="nav-item">
                    <button id="createAccountBtn" className="nav-link btn btn-link"
                     onClick={() => this.setState({showCreateAccount: true})}>
                        Create Account
                    </button>
                </li>
                <li className="nav-item">
                    <button id="resetPasswordBtn" className="nav-link btn btn-link">Reset Password</button>
                </li>
                </ul>
            </div>  
        )
    }
}

export default LoginPage;