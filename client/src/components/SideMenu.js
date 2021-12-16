import React from 'react';
/*
   SideMenu function returns the html for each menu item 
   in the side menu: Settings, about, and Log Out. SideMenu
   has been reimplemented to support React hooks.
*/
function SideMenu(props){
   return (
    <ul id="sideMenu" role="menu" className="sidemenu"
      arial-labelledby="menuBtn">
      <li role="menuitem" tabIndex="-1">
      Settings
      </li>
      <li role="menuitem" tabIndex="-1">
      About
      </li>
      <li role="menuitem" tabIndex="-1"
        onClick={props.logOut}>
      Log Out
      </li>
    </ul>  
  );
}

export default SideMenu;