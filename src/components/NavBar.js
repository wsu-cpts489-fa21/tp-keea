import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../images/sslogo.png'


class NavBar extends React.Component {
    
    render() {
       return (
        <header className="navbar">  
        <a id="sLink" className="skip-link" tabIndex="0">
         Skip to content</a>
         <button id="menuBtn" type="button" className="navbar-btn" 
            title="Menu" aria-controls="sideMenu" 
            aria-label="Actions" aria-haspopup="true" 
            aria-expanded="false">
            <FontAwesomeIcon icon="bars" className="navbar-btn-icon"/>
          </button>
          <img src={logo} className="navbar-app-icon" 
            alt="SpeedScore logo" />
           <h1 id="appName" className="navbar-title">SpeedScore</h1> 
           <div className="navbar-right-items">
                <input id="searchBox" className="form-control hidden" 
                aria-label="Search Rounds" size="30"
                type="search" />
                <button id="searchBtn" type="button" className="navbar-btn hidden" 
                    aria-label="Open Rounds Search">
                    <FontAwesomeIcon icon="search" className="navbar-btn-icon"/>
                </button>
                <button id="profileBtn" type="button" 
                  className="navbar-btn navbar-profile-btn hidden" 
                  aria-label="Account and Profile Settings">
                </button> 
            </div>
      </header>
    ); 
  }
}

export default NavBar;