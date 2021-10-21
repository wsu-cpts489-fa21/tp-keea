import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core"; 
import { faWindowClose, faEdit, faCalendar, 
        faSpinner, faSignInAlt, faBars, faTimes, faSearch,
        faSort, faTrash, faEye, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import NavBar from './NavBar.js';
import ModeTabs from './ModeTabs.js';
import LoginPage from './LoginPage.js';
import FeedPage from './FeedPage.js';
import RoundsPage from './RoundsPage.js';
import CoursesPage from './CoursesPage.js';
import BuddiesPage from './BuddiesPage.js';
import SideMenu from './SideMenu.js';
import AppMode from './AppMode.js';

library.add(faWindowClose,faEdit, faCalendar, 
            faSpinner, faSignInAlt, faBars, faTimes, faSearch,
            faSort, faTrash, faEye, faUserPlus);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {mode: AppMode.LOGIN,
                  menuOpen: false,
                  modalOpen: false,
                  userData: {accountData: {},
                             identityData: {},
                             speedgolfData: {},
                             rounds: [],
                             roundCount: 0}
                  };
  }

  /*
   handleClick -- document-level click handler assigned in componentDidMount()
   using 'true' as third param to addEventListener(). This means that the event
   handler fires in the _capturing_ phase, not the default _bubbling_ phase.
   Thus, the event handler is fired _before_ any events reach their lowest-level
   target. If the menu is open, we want to close
   it if the user clicks anywhere _except_ on a menu item, in which case we
   want the menu item event handler to get the event (through _bubbling_).
   We identify this border case by comparing 
   e.target.getAttribute("role") to "menuitem". If that's NOT true, then
   we close the menu and stop propagation so event does not reach anyone
   else. However, if the target is a menu item, then we do not execute 
   the if body and the event bubbles to the target. 
  */
  
  handleClick = (e) => {
    if (this.state.menuOpen && e.target.getAttribute("role") !== "menuitem") {
      this.toggleMenuOpen();
      e.stopPropagation();
    }
  }

  /*
   * Menu item functionality 
   */
  logOut = () => {
    this.setState({mode:AppMode.LOGIN,
                   menuOpen: false});
  }

  componentDidMount() {
    //Install a doc-level click handler
    document.addEventListener("click",this.handleClick, true)
  }

  
   //User interface state management methods
   
  setMode = (newMode) => {
    this.setState({mode: newMode});
  }

  toggleMenuOpen = () => {
    this.setState(prevState => ({menuOpen: !prevState.menuOpen}));
  }

  toggleModalOpen = () => {
    this.setState(prevState => ({dialogOpen: !prevState.dialogOpen}));
  }

  //Account Management methods
   
  accountExists = (email) => {
    return (localStorage.getItem(email) !== null);
  }

  accountValid = (email, pw) => {
    const userDataString = localStorage.getItem(email);
    if (userDataString == null) {
      return false;
    }
    const userData = JSON.parse(userDataString);
    return (userData.accountData.password === pw);   
  }

  logInUser = (email) => {
      const data = JSON.parse(localStorage.getItem(email));
      this.setState({userData: data,
                     mode: AppMode.FEED});
  }

  createAccount = (data) => {
    localStorage.setItem(data.accountData.email, JSON.stringify(data));
  }

  updateUserData = (data) => {
   localStorage.setItem(data.accountData.email,JSON.stringify(data));
   this.setState({userData: data});
  }

  //Round Management methods

  addRound = (newRoundData) => {
    const newRounds = [...this.state.userData.rounds];
    const newRoundCount = this.state.userData.roundCount + 1;
    newRoundData.roundNum = newRoundCount;
    newRounds.push(newRoundData);
    const newUserData = {
      accountData: this.state.userData.accountData,
      identityData: this.state.userData.identityData,
      speedgolfProfileData: this.state.userData.speedgolfProfileData,
      rounds: newRounds, 
      roundCount: newRoundCount
    };
    localStorage.setItem(newUserData.accountData.email,JSON.stringify(newUserData));
    this.setState({userData: newUserData});
  }

  updateRound = (newRoundData) => {
    const newRounds = [...this.state.userData.rounds];
    let r;
    for (r = 0; r < newRounds.length; ++r) {
        if (newRounds[r].roundNum === newRoundData.roundNum) {
            break;
        }
    }
    newRounds[r] = newRoundData;
    const newUserData = {
      accountData: this.state.userData.accountData,
      identityData: this.state.userData.identityData,
      speedgolfProfileData: this.state.userData.speedgolfProfileData,
      rounds: newRounds, 
      roundCount: this.state.userData.roundCount
    }
    localStorage.setItem(newUserData.accountData.email,JSON.stringify(newUserData));
    this.setState({userData: newUserData}); 
  }

  deleteRound = (id) => {
    const newRounds = [...this.state.userData.rounds];
    let r;
    for (r = 0; r < newRounds.length; ++r) {
        if (newRounds[r].roundNum === this.state.deleteId) {
            break;
        }
    }
    delete newRounds[r];
    const newUserData = {
      accountData: this.state.userData.accountData,
      identityData: this.state.userData.identityData,
      speedgolfProfileData: this.state.userData.speedgolfProfileData,
      rounds: newRounds, 
      roundCount: this.state.userData.roundCount
    }
    localStorage.setItem(newUserData.accountData.email,JSON.stringify(newUserData));
    this.setState({userData: newUserData});
  }

  render() {
    return (
      <>
        <NavBar mode={this.state.mode}
                menuOpen={this.state.menuOpen}
                toggleMenuOpen={this.toggleMenuOpen}
                modalOpen={this.state.modalOpen}
                toggleModalOpen={this.toggleModalOpen}
                userData={this.state.userData}
                updateUserData={this.updateUserData} /> 
        <ModeTabs mode={this.state.mode}
                  setMode={this.setMode} 
                  menuOpen={this.state.menuOpen}
                  modalOpen={this.state.modalOpen}/> 
        {this.state.menuOpen  ? <SideMenu logOut={this.logOut}/> : null}
        {
          {LoginMode:
            <LoginPage modalOpen={this.state.modalOpen}
                       toggleModalOpen={this.toggleModalOpen} 
                       logInUser={this.logInUser}
                       createAccount={this.createAccount}
                       accountExists={this.accountExists}
                       accountValid={this.accountValid}/>, 
          FeedMode:
            <FeedPage modalOpen={this.state.modalOpen}
                      toggleModalOpen={this.toggleModalOpen} 
                      menuOpen={this.state.menuOpen}
                      userId={this.state.userId}/>,
          RoundsMode:
            <RoundsPage rounds={this.state.userData.rounds}
                        addRound={this.addRound}
                        updateRound={this.updateRound}
                        deleteRound={this.deleteRound}
                        modalOpen={this.state.modalOpen}
                        toggleModalOpen={this.toggleModalOpen} 
                        menuOpen={this.state.menuOpen}
                        userId={this.state.userId}/>,
          CoursesMode:
            <CoursesPage modalOpen={this.state.modalOpen}
                        toggleModalOpen={this.toggleModalOpen} 
                        menuOpen={this.state.menuOpen}
                        userId={this.state.userId}/>,
          BuddiesMode:
            <BuddiesPage modalOpen={this.state.modalOpen}
                        toggleModalOpen={this.toggleModalOpen} 
                        menuOpen={this.state.menuOpen}
                        userId={this.state.userId}/>
        }[this.state.mode]
        }
      </>
    ); 
  }

}
export default App;
