import React from 'react';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.emailError = React.createRef();
        this.passwordError = React.createRef();
        this.authError = React.createRef();
    }

    render() {
        return(
            <div id="loginPage" className="mode-page">
                <h1 className="mode-page-header">Log In</h1>
                <div id="accountCreated" className="toast-container hidden" role="alert" aria-atomic="true" aria-live="assertive">
                <div className="toast-text">
                    New account created with email <span id="accountCreatedEmail"></span>
                </div>
                <button id="accountCreatedClose" type="button" className="btn-close toast-close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <p id="errorBox" className="alert alert-danger centered hidden">
                    <a id="emailError" href="#email" 
                        className="alert-link" 
                        ref={this.emailError}>
                        Enter a valid email address<br/>
                    </a>
                    <a id="passwordError" 
                        href="#password" 
                        className="alert-link" 
                        ref={this.passwordError}>
                        Enter a valid password
                    </a>
                    <a id="authError" 
                        href="#email" 
                        className="alert-link"
                        ref={this.authError}>
                            No user account exists with email and password entered. Create an account or re-enter email and/or password
                    </a>
                </p>
                <form id="loginForm" className="centered" noValidate>
                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:<br/>
                        <input id="email" type="email" className="form-control-lg centered"
                            aria-describedby="emailDescr"required />
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
                        required />
                    </label>
                    <div id="passwordDescr" className="form-text">
                        Passwords must be at least 8 characters long with at least one number, 
                        one lower case letter, and one upper case letter.
                    </div>
                    </div>
                <p></p>
                <button type="submit" id="loginBtn" 
                        className="btn btn-primary fm-primary-btn">
                    <span id="loginBtnIcon" 
                        className="fas fa-sign-in-alt" 
                        aria-hidden="true"></span>
                        &nbsp;Log In
                </button>
                </form>
                <ul className="nav justify-content-center">
                <li className="nav-item">
                    <button id="createAccountBtn" className="nav-link btn btn-link">
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