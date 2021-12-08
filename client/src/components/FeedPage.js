import React from 'react';
import logo from '../images/sslogo2.png'
/*
   FeedPage function returns the html for the Feed Page.
   FeedPage has been reimplemented to support React hooks.
*/
function FeedPage(Props) {
    return (
        <div id="feedModeTab" className="mode-page" role="tabpanel"
                aria-label="Feed Tab" tabIndex="0">
            <h1 className="mode-page-header">Activity Feed</h1>
            <p className="mode-page-content">This page is under construction.</p>
            <img className="mode-page-icon" 
                    src={logo} alt="SpeedScore logo"></img>
        </div>
    );   
}

export default FeedPage;