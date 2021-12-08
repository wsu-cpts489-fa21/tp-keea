import React from 'react';
import logo from '../images/sslogo2.png'
/*
   BuddiesPage function returns the html for information
   about the Buddies Page. BuddiesPage has been reimplemented
   to support React hooks.
*/
function BuddiesPage(props) {
    return (
        <div id="buddiesModeTab" className="mode-page" role="tabpanel"
                aria-label="Buddies Tab" tabIndex="0">
            <h1 className="mode-page-header">Buddies</h1>
            <p className="mode-page-content">This page is under construction.</p>
            <img className="mode-page-icon" 
                    src={logo} alt="SpeedScore logo"></img>
        </div>
    );   
}

export default BuddiesPage;