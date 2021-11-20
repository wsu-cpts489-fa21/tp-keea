import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import profilePic from './../images/DefaultProfilePic.jpg'

class ProfileSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.userData.accountData.id,
            displayName: this.props.userData.identityData.displayName,
            profilePic: this.props.userData.identityData.profilePic,
            securityQuestion: "",
            securityAnswer: "",
            speedGolfBio: this.props.userData.speedgolfData.bio,
            speedGolfClubs: this.props.userData.speedgolfData.clubComments,
            speedGolfHome: this.props.userData.speedgolfData.homeCourse,
            emailValid: true,
            securityQuestionValid: true,
            securityAnswerValid: true,
            accountValid: true,
            panelOne: true,
            panelTwo: false,
            panelThree: false
        };
        this.IsOAuth = this.determineIfOAuth(this.state.email);
        this.formSubmitted = false;
        this.accountError = React.createRef();
        this.emailError = React.createRef();
        this.securityQuestionError = React.createRef();
        this.securityAnswerError = React.createRef();
    }

    componentDidMount() {
        this.cancelButton.focus();
    }

    componentDidUpdate() {
        if (this.formSubmitted) {
          if (!this.state.securityAnswerValid) {
              this.securityAnswerError.current.focus();
          }
          if (!this.state.securityQuestionValid) {
              this.securityQuestionError.current.focus();
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

    determineIfOAuth = (email) => {
        const oAuthExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(google|github)$/;
        return oAuthExpression.test(String(email).toLowerCase());
    }

    emailIsValid = (email) => {
        const localExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const oAuthExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(google|github)$/;
        if (localExpression.test(String(email).toLowerCase()) || oAuthExpression.test(String(email).toLowerCase()))
        {
            return true;
        }
        return false;
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
  
    handleSubmit = async(event) => {
        event.preventDefault();
        if (this.IsOAuth)
        {
            //Are fields valid?
            const eValid = this.emailIsValid(this.state.email);
            const acctAvail = !(await this.props.accountExists(this.state.email));
            if (eValid && acctAvail) { 
                //All fields valid: create account
                const newAccount = {
                    accountData: {
                        id: this.state.email,
                    },
                    identityData: {
                        displayName: (this.state.displayName !== "" ? this.state.displayName : this.state.email),
                        profilePic: this.state.profilePic
                    },
                    speedgolfData: {
                        bio: this.state.speedGolfBio,
                        homeCourse: this.state.speedGolfHome,
                        clubComments: this.state.speedGolfClubs
                    }
                };
                this.props.updateUserData(newAccount);
                this.props.cancel();
            } else { //At least one field invalid
                    //Clear out invalid fields and display errors
                const eVal = (!eValid ? "" : this.state.email);
                const dnVal = (this.state.displayName !== "" ? this.state.displayName : this.state.email);
                this.formSubmitted = true; //Ensures error message gets focus
                this.setState({email: eVal,
                                displayName: dnVal,
                                emailValid: eValid});
            }
        }
        else {
            //Are fields valid?
            const eValid = this.emailIsValid(this.state.email);
            const sqValid = (this.state.securityQuestion.length > 0);
            const saValid = (this.state.securityAnswer.length > 0);
            const acctAvail = !(await this.props.accountExists(this.state.email));
            if (eValid && sqValid && saValid && acctAvail) { 
                //All fields valid: create account
                const newAccount = {
                    accountData: {
                        id: this.state.email,
                        securityQuestion: this.state.securityQuestion,
                        securityAnswer: this.state.securityAnswer
                    },
                    identityData: {
                        displayName: (this.state.displayName !== "" ? this.state.displayName : this.state.email),
                        profilePic: this.state.profilePic
                    },
                    speedgolfData: {
                        bio: this.state.speedGolfBio,
                        homeCourse: this.state.speedGolfHome,
                        clubComments: this.state.speedGolfClubs
                    }
                };
                this.props.updateUserData(newAccount);
                //this.props.cancel();
            } else { //At least one field invalid
                    //Clear out invalid fields and display errors
                const eVal = (!eValid ? "" : this.state.email);
                const dnVal = (this.state.displayName !== "" ? this.state.displayName : this.state.email);
                this.formSubmitted = true; //Ensures error message gets focus
                this.setState({email: eVal,
                                displayName: dnVal,
                                emailValid: eValid,
                                securityQuestionValid: sqValid,
                                securityAnswerValid: saValid});
            }
        }
    }

    cancelClick = () => {
        this.props.cancel();
    }

    panelOneClick = () => {
        this.setState({panelOne: !this.state.panelOne});
    }

    panelTwoClick = () => {
        this.setState({panelTwo: !this.state.panelTwo});
    }

    panelThreeClick = () => {
        this.setState({panelThree: !this.state.panelThree});
    }

    renderErrorBox = () => {
        if (this.state.emailValid && this.state.securityQuestionValid &&
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
        return(
            <div id="profileSettingsDialog" 
            classNameName="mode-page" role="dialog" 
            aria-modal="true" aria-labelledby="accountProfileHeader" tabIndex="0" onKeyDown={this.onKeyPressed}>
                <h1 id="accountProfileHeader" classNameName="mode-page-header">Account & Profile</h1>
                {this.renderErrorBox()}
                <form onSubmit={this.handleSubmit} id="editProfileForm" className="centered" novalidate>
                    <div id="profileFormAccordion" className="accordion">
                        <div className="accordion-item">
                        {this.state.panelOne ?
                            <fieldset>
                                <h2 className="accordion-header" id="accountHeader">
                                    <button id="accountSettingsBtn" className="accordion-button" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#accountSettingsPanel" 
                                        aria-expanded="true" 
                                        aria-controls="accountSettingsPanel" onClick={this.panelOneClick}>
                                        <legend>Account</legend>
                                    </button>
                                </h2> 
                                <div id="accountSettingsPanel"
                                className="accordion-collapse collapse show" 
                                aria-labelledby="accountHeader" 
                                data-bs-parent="#profileFormAccordion">
                                    <div className="accordion-body">
                                        <div className="mb-3">
                                            <label for="profileEmail" className="form-label">Email:
                                                {this.IsOAuth ? 
                                                <input
                                                id="profileEmail"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                                onBlur={this.setDefaultDisplayName}
                                                className="form-control centered"
                                                name="email"
                                                type="email"
                                                size="35"
                                                aria-describedby="profileEmailDescr"
                                                disabled
                                                required/> : 
                                                <input
                                                id="profileEmail"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                                onBlur={this.setDefaultDisplayName}
                                                className="form-control centered"
                                                name="email"
                                                type="email"
                                                size="35"
                                                aria-describedby="profileEmailDescr"
                                                required/>}
                                            </label>
                                            <div id="profileEmailDescr" className="form-text">
                                                Enter a valid email address (e.g., 'name@domain.com' or 'name@google'/'name@github' for OAuth provided accounts).
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label for="profilePassword" className="form-label">Password:
                                                <input id="profilePassword" type="password" className="form-control centered"
                                                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                                                aria-describedby="profilePasswordDescr"
                                                disabled/>
                                            </label>
                                            <div id="profilePasswordDescr" className="form-text">
                                                Use the "Reset Password" option on the Log In page to reset your password.
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label for="profileSecurityQuestion" className="form-label">Security Question:
                                                {this.IsOAuth ?
                                                    <input id="profileSecurityQuestion"
                                                    ref={this.securityQuestion}
                                                    value={this.state.securityQuestion}
                                                    onChange={this.handleChange}
                                                    className="form-control centered"
                                                    name="securityQuestion"
                                                    size="35"
                                                    type="text"
                                                    minlength="5"
                                                    disabled
                                                    aria-describedby="profileSecurityQuestionDescr"
                                                    /> :
                                                    <input id="profileSecurityQuestion"
                                                    ref={this.securityQuestion}
                                                    value={this.state.securityQuestion}
                                                    onChange={this.handleChange}
                                                    className="form-control centered"
                                                    name="securityQuestion"
                                                    size="35"
                                                    type="text"
                                                    minlength="5"
                                                    required
                                                    aria-describedby="profileSecurityQuestionDescr"
                                                    />
                                                }
                                            </label>
                                            <div id="profileSecurityQuestionDescr" className="form-text">
                                                Your security question must be at least 5 characters and should have a memorable answer. You will be asked
                                                this question if you ever need to reset your password.
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label for="profileSecurityAnswer" className="form-label">Answer to Security Question:
                                                {this.IsOAuth ?
                                                    <input id="profileSecurityAnswer"
                                                    ref={this.securityAnswer}
                                                    value={this.state.securityAnswer}
                                                    onChange={this.handleChange}
                                                    className="form-control centered"
                                                    name="securityAnswer"
                                                    type="text"
                                                    minlength="5"
                                                    aria-describedby="profileSecurityAnswerDescr"
                                                    disabled/> :
                                                    <input id="profileSecurityAnswer"
                                                    ref={this.securityAnswer}
                                                    value={this.state.securityAnswer}
                                                    onChange={this.handleChange}
                                                    className="form-control centered"
                                                    name="securityAnswer"
                                                    type="text"
                                                    minlength="5"
                                                    aria-describedby="profileSecurityAnswerDescr"
                                                    required/>
                                                }
                                            </label>
                                            <div id="profileSecurityAnswerDescr" className="form-text">
                                                Your security answer must be at least 5 characters and should be something you easily associate
                                                your security question. You will have to provide this answer if you ever need to reset your password.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>:
                            <fieldset>
                                <h2 className="accordion-header" id="accountHeader">
                                    <button id="accountSettingsBtn" className="accordion-button collapsed" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#accountSettingsPanel" 
                                        aria-expanded="true" 
                                        aria-controls="accountSettingsPanel" onClick={this.panelOneClick}>
                                        <legend>Account</legend>
                                    </button>
                                </h2> 
                                <div id="accountSettingsPanel"
                                className="accordion-collapse collapse" 
                                aria-labelledby="accountHeader" 
                                data-bs-parent="#profileFormAccordion">
                                    <div className="accordion-body">
                                        <div className="mb-3">
                                            <label for="profileEmail" className="form-label">Email:
                                                {this.IsOAuth ? 
                                                <input
                                                id="profileEmail"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                                onBlur={this.setDefaultDisplayName}
                                                className="form-control centered"
                                                name="email"
                                                type="email"
                                                size="35"
                                                aria-describedby="profileEmailDescr"
                                                disabled
                                                required/> : 
                                                <input
                                                id="profileEmail"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                                onBlur={this.setDefaultDisplayName}
                                                className="form-control centered"
                                                name="email"
                                                type="email"
                                                size="35"
                                                aria-describedby="profileEmailDescr"
                                                required/>}
                                            </label>
                                            <div id="profileEmailDescr" className="form-text">
                                                Enter a valid email address (e.g., 'name@domain.com' or 'name@google'/'name@github' for OAuth provided accounts).
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label for="profilePassword" className="form-label">Password:
                                                <input id="profilePassword" type="password" className="form-control centered"
                                                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
                                                aria-describedby="profilePasswordDescr"
                                                disabled/>
                                            </label>
                                            <div id="profilePasswordDescr" className="form-text">
                                                Use the "Reset Password" option on the Log In page to reset your password.
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label for="profileSecurityQuestion" className="form-label">Security Question:
                                                {this.IsOAuth ?
                                                        <input id="profileSecurityQuestion"
                                                        ref={this.securityQuestion}
                                                        value={this.state.securityQuestion}
                                                        onChange={this.handleChange}
                                                        className="form-control centered"
                                                        name="securityQuestion"
                                                        size="35"
                                                        type="text"
                                                        minlength="5"
                                                        disabled
                                                        aria-describedby="profileSecurityQuestionDescr"
                                                        /> :
                                                        <input id="profileSecurityQuestion"
                                                        ref={this.securityQuestion}
                                                        value={this.state.securityQuestion}
                                                        onChange={this.handleChange}
                                                        className="form-control centered"
                                                        name="securityQuestion"
                                                        size="35"
                                                        type="text"
                                                        minlength="5"
                                                        required
                                                        aria-describedby="profileSecurityQuestionDescr"
                                                        />
                                                }
                                            </label>
                                            <div id="profileSecurityQuestionDescr" className="form-text">
                                                Your security question must be at least 5 characters and should have a memorable answer. You will be asked
                                                this question if you ever need to reset your password.
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label for="profileSecurityAnswer" className="form-label">Answer to Security Question:
                                                {this.IsOAuth ?
                                                        <input id="profileSecurityAnswer"
                                                        ref={this.securityAnswer}
                                                        value={this.state.securityAnswer}
                                                        onChange={this.handleChange}
                                                        className="form-control centered"
                                                        name="securityAnswer"
                                                        type="text"
                                                        minlength="5"
                                                        aria-describedby="profileSecurityAnswerDescr"
                                                        disabled/> :
                                                        <input id="profileSecurityAnswer"
                                                        ref={this.securityAnswer}
                                                        value={this.state.securityAnswer}
                                                        onChange={this.handleChange}
                                                        className="form-control centered"
                                                        name="securityAnswer"
                                                        type="text"
                                                        minlength="5"
                                                        aria-describedby="profileSecurityAnswerDescr"
                                                        required/>
                                                }
                                            </label>
                                            <div id="profileSecurityAnswerDescr" className="form-text">
                                                Your security answer must be at least 5 characters and should be something you easily associate
                                                your security question. You will have to provide this answer if you ever need to reset your password.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>}
                        </div>
                        <div className="accordion-item">
                        {this.state.panelTwo ? 
                            <fieldset>
                                <h2 id="profileHeader" className="accordion-header">
                                    <button id="profileSettingsBtn" className="accordion-button" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#profileSettingsPanel" 
                                        aria-expanded="false" 
                                        aria-controls="profileSettingsPanel" onClick={this.panelTwoClick}>
                                        <legend>Name & Picture</legend>
                                    </button>
                                </h2>
                                <div id="profileSettingsPanel" className="accordion-collapse collapse show"
                                aria-labelledby="profileHeader" data-bs-parent="#profileFormAccordion">
                                    <div className="accordion-body">
                                        <div className="mb-3">
                                            <label for="profileDisplayName" className="form-label">Display Name:<br/>
                                                <input id="profileDisplayName" 
                                                value={this.state.displayName}
                                                onChange={this.handleChange}
                                                className="form-control centered"
                                                name="displayName"
                                                type="text"
                                                size="35"
                                                minlength="5"
                                                aria-describedby="profileDisplayNameDescr"
                                                required/>
                                            </label>
                                            <div id="profileDisplayNameDescr" className="form-text">
                                                Your display name is your identity within SpeedScore. It must be at least 5 characters.
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label for="profilePic" className="form-label">Profile Picture (optional):<br/>
                                                <img id="profilePicImage" src={this.state.profilePic == "" ? profilePic :
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
                                                Upload a profile picture as a .png, .gif, or .jpg file. A rectangular head shot works best.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>:
                                <fieldset>
                                <h2 id="profileHeader" className="accordion-header">
                                    <button id="profileSettingsBtn" className="accordion-button collapsed" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#profileSettingsPanel" 
                                        aria-expanded="false" 
                                        aria-controls="profileSettingsPanel" onClick={this.panelTwoClick}>
                                        <legend>Name & Picture</legend>
                                    </button>
                                </h2> 
                                <div id="profileSettingsPanel" className="accordion-collapse collapse"
                                aria-labelledby="profileHeader" data-bs-parent="#profileFormAccordion">
                                    <div className="accordion-body">
                                        <div className="mb-3">
                                            <label for="profileDisplayName" className="form-label">Display Name:<br/>
                                                <input id="profileDisplayName" 
                                                value={this.state.displayName}
                                                onChange={this.handleChange}
                                                className="form-control centered"
                                                name="displayName"
                                                type="text"
                                                size="35"
                                                minlength="5"
                                                aria-describedby="profileDisplayNameDescr"
                                                required/>
                                            </label>
                                            <div id="profileDisplayNameDescr" className="form-text">
                                                Your display name is your identity within SpeedScore. It must be at least 5 characters.
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label for="profilePic" className="form-label">Profile Picture (optional):<br/>
                                                <img id="profilePicImage" src={this.state.profilePic == "" ? profilePic :
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
                                                Upload a profile picture as a .png, .gif, or .jpg file. A rectangular head shot works best.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>}
                        </div>
                        <div className="accordion-item">
                        {this.state.panelThree ?
                            <fieldset>
                                <h2 id="sgHeader" className="accordion-header">
                                    <button id="sgSettingsBtn" className="accordion-button" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#sgSettingsPanel" 
                                    aria-expanded="false" 
                                    aria-controls="sgSettingsPanel" onClick={this.panelThreeClick}>
                                        <legend>Speedgolf Info</legend>
                                    </button>
                                </h2> 
                                <div id="sgSettingsPanel" className="accordion-collapse collapse show"
                                aria-labelledby="sgHeader" data-bs-parent="#profileFormAccordion">
                                    <div className="accordion-body">
                                        <div className="mb-3">
                                            <label for="sgBio" className="form-label">Personal Speedgolf Bio (optional):</label>
                                            <textarea id="sgBio"
                                            className="form-control"
                                            aria-describedby="sgBioDescr"
                                            rows="5"
                                            cols="40"
                                            maxlength="500"
                                            name="speedGolfBio"
                                            value={this.state.speedGolfBio}
                                            onChange={this.handleChange}>
                                            </textarea>
                                            <div id="sgBioDescr" className="form-text">
                                                A short personal bio about your speedgolf journey. Maximum of 500 characters.
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label for="sgHomeCourser" className="form-label">Home Course (optional):</label>
                                            <input type="text"
                                            id="sgHomeCourse"
                                            className="form-control centered"
                                            value={this.state.speedGolfHome}
                                            onChange={this.handleChange}
                                            name="speedGolfHome"
                                            aria-describedby="sgHomeCourseDescr"/>
                                            <div id="sgHomeCourseDescr" className="form-text">
                                                Course where you play most of your speedgolf.
                                            </div>
                                        </div>
                                        <fieldset>
                                            <legend className="fm-legend-sm">Clubs in Bag (optional)</legend>
                                            <div id="clubsDiv" className="mb-3">
                                                <label for="sgClubComments" className="form-label">Comments on Clubs (optional):</label>
                                                <textarea id="sgClubComments"
                                                className="form-control"
                                                value={this.state.speedGolfClubs}
                                                onChange={this.handleChange}
                                                name="speedGolfClubs"
                                                aria-describedby="sgClubCommentsDescr"></textarea>
                                                <div id="sgClubCommentsDescr" className="form-text">
                                                    Describe your clubs in greater detail. 
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </fieldset>:
                            <fieldset>
                                <h2 id="sgHeader" className="accordion-header">
                                    <button id="sgSettingsBtn" className="accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#sgSettingsPanel" 
                                    aria-expanded="false" 
                                    aria-controls="sgSettingsPanel" onClick={this.panelThreeClick}>
                                        <legend>Speedgolf Info</legend>
                                    </button>
                                </h2>
                                <div id="sgSettingsPanel" className="accordion-collapse collapse"
                                aria-labelledby="sgHeader" data-bs-parent="#profileFormAccordion">
                                    <div className="accordion-body">
                                        <div className="mb-3">
                                            <label for="sgBio" className="form-label">Personal Speedgolf Bio (optional):</label>
                                            <textarea id="sgBio"
                                            className="form-control"
                                            aria-describedby="sgBioDescr"
                                            rows="5"
                                            cols="40"
                                            maxlength="500"
                                            name="speedGolfBio"
                                            value={this.state.speedGolfBio}
                                            onChange={this.handleChange}>
                                            </textarea>
                                            <div id="sgBioDescr" className="form-text">
                                                A short personal bio about your speedgolf journey. Maximum of 500 characters.
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label for="sgHomeCourser" className="form-label">Home Course (optional):</label>
                                            <input type="text"
                                            id="sgHomeCourse"
                                            className="form-control centered"
                                            value={this.state.speedGolfHome}
                                            onChange={this.handleChange}
                                            name="speedGolfHome"
                                            aria-describedby="sgHomeCourseDescr"/>
                                            <div id="sgHomeCourseDescr" className="form-text">
                                                Course where you play most of your speedgolf.
                                            </div>
                                        </div>
                                        <fieldset>
                                            <legend className="fm-legend-sm">Clubs in Bag (optional)</legend>
                                            <div id="clubsDiv" className="mb-3">
                                                <label for="sgClubComments" className="form-label">Comments on Clubs (optional):</label>
                                                <textarea id="sgClubComments"
                                                className="form-control"
                                                value={this.state.speedGolfClubs}
                                                name="speedGolfClubs"
                                                onChange={this.handleChange}
                                                aria-describedby="sgClubCommentsDescr"></textarea>
                                                <div id="sgClubCommentsDescr" className="form-text">
                                                    Describe your clubs in greater detail. 
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </fieldset>}
                        </div>
                    </div>
                    <div className="mode-page-btn-container">
                        <button type="submit" id="submitUpdateProfileBtn" 
                        className="btn btn-primary dialog-primary-btn" 
                        aria-live="polite" aria-busy="false"
                        ref={buttonEl => (this.saveButton = buttonEl)}>
                            <FontAwesomeIcon icon="user-edit"/>
                            &nbsp;Update
                        </button>
                        <button type="button" id="cancelUpdateProfileBtn" 
                        className="btn btn-secondary dialog-cancel-btn"
                        onClick={() => this.cancelClick()}
                        ref={buttonEl => (this.cancelButton = buttonEl)}>
                            <FontAwesomeIcon icon="window-close"/>
                            &nbsp;Cancel
                        </button>
                    </div>
                </form>
            </div> 
        );
    }
}

export default ProfileSettings;