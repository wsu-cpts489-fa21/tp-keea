import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../images/sslogo.png'
import profilePic from '../images/DefaultProfilePic.jpg';
import AppMode from './AppMode';

class NavBar extends React.Component {
    
    render() {
       return (
        <header className="navbar">  
        <a id="sLink" className="skip-link" tabIndex="0">
         Skip to content</a>
         {this.props.mode != AppMode.LOGIN && !this.props.modalOpen ?
         <button id="menuBtn" type="button" className="navbar-btn" 
            title="Menu" aria-controls="sideMenu" 
            aria-label="Actions" aria-haspopup="true" 
            aria-expanded={this.props.menuOpen ? "true" : "false"}
            onClick={this.props.toggleMenuOpen}>
            <FontAwesomeIcon 
              icon={this.props.menuOpen ? "times" : "bars"}
              className="navbar-btn-icon"/>
          </button> : null }
          <img src={logo} className="navbar-app-icon" 
            alt="SpeedScore logo" />
           <h1 id="appName" className="navbar-title">SpeedScore</h1> 
           {this.props.mode != AppMode.LOGIN && !this.props.modalOpen ?
             <div className="navbar-right-items">
                <input id="searchBox" className="form-control hidden" 
                aria-label="Search Rounds" size="30"
                type="search" />
                <button id="searchBtn" type="button" className="navbar-btn" 
                    aria-label="Open Rounds Search">
                    <FontAwesomeIcon icon="search" className="navbar-btn-icon"/>
                </button>
                <button id="profileBtn" type="button" 
                  className="navbar-btn navbar-profile-btn" 
                  aria-label="Account and Profile Settings"
                  onClick={this.props.updateUserData}
                  style={{backgroundImage: this.props.userData.identityData.profilePic === "" ? 
                            `url(${profilePic})` : 
                            `url(${this.props.userData.identityData.profilePic})`}}>
                </button> 
              </div> : 
              <div className="navbar-right-items"></div>}
      </header>
    ); 
  }
}

export default NavBar;