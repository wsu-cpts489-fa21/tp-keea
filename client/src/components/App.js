import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core"; 
import { faWindowClose, faEdit, faCalendar, 
        faSpinner, faSignInAlt, faBars, faTimes, faSearch,
        faSort, faTrash, faEye, faUserPlus, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faGithub} from '@fortawesome/free-brands-svg-icons';
import NavBar from './NavBar.js';
import ModeTabs from './ModeTabs.js';
import LoginPage from './LoginPage.js';
import FeedPage from './FeedPage.js';
import RoundsPage from './RoundsPage.js';
import CoursesPage from './CoursesPage.js';
import BuddiesPage from './BuddiesPage.js';
import SideMenu from './SideMenu.js';
import AppMode from './AppMode.js';
import ProfileSettings from './ProfileSettings.js';

library.add(faWindowClose,faEdit, faCalendar, 
            faSpinner, faSignInAlt, faBars, faTimes, faSearch,
            faSort, faTrash, faEye, faUserPlus, faGithub, faUserEdit);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {mode: AppMode.LOGIN,
                  menuOpen: false,
                  modalOpen: false,
                  editingProfile: false,
                  userData: {
                    accountData: {},
                    identityData: {},
                    speedgolfData: {},
                    rounds: [],
                    roundCount: 0},
                  authenticated: false                  
                  };
  }

  componentDidMount() {
    document.addEventListener("click",this.handleClick, true);
    if (!this.state.authenticated) { 
      //Use /auth/test route to (re)-test authentication and obtain user data
      fetch("/auth/test")
        .then((response) => response.json())
        .then((obj) => {
          if (obj.isAuthenticated) {
            this.logInUser(obj.user);
          }
        })
    } 
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
                   userData: {
                    accountData: {},
                    identityData: {},
                    speedgolfData: {},
                    rounds: [],
                    },
                   authenticated: false,
                   menuOpen: false});
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
   
  accountExists = async(email) => {
    const res = await fetch("/user/" + email);
    return (res.status === 200);
  }

  getAccountData = (email) => {
    return JSON.parse(localStorage.getItem(email));
  }

  authenticateUser = async(id, pw) => {
    const url = "/auth/login?username=" + id + 
      "&password=" + pw;
    const res = await fetch(url,{method: 'POST'});
    if (res.status == 200) { //successful login!
      return true;
    } else { //Unsuccessful login
      return false;
    } 
  }

  logInUser = (userObj) => {
      this.setState({userData: userObj,
                     mode: AppMode.FEED,
                     authenticated: true});
  }

  createAccount = async(data) => {
    const url = '/users/' + data.accountData.id;
    const res = await fetch(url, {
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        method: 'POST',
        body: JSON.stringify(data)}); 
    if (res.status == 201) { 
        return("New account created with email " + data.accountData.id);
    } else { 
        const resText = await res.text();
        return("New account was not created. " + resText);
    }
  }

  updateUserData = async(data) => {
    const url = '/users/' + this.state.userData.accountData.id;
    const res = await fetch(url, {
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        method: 'PUT',
        body: JSON.stringify(data)});
    if (res.status == 200) {
      const newUserData = data;
      this.setState({userData: newUserData});
      return("Account with email " + data.accountData.id + " updated");
    }
    else {
      const resText = await res.text();
      return("Account was not updated. " + resText);
    }
  }

  startProfileEdit = () => {
    this.setState({editingProfile: true});
  }

  cancelProfileEdit = () => {
    this.setState({editingProfile: false});
  }

  //Round Management methods

  addRound = async(newRoundData) => {
    const url = "/rounds/" + this.state.userData.accountData.id;
    let res = await fetch(url, {
                  method: 'POST',
                  headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                                },
                          method: 'POST',
                          body: JSON.stringify(newRoundData)
                }); 
    if (res.status == 201) { 
      const newRounds = [...this.state.userData.rounds];
      newRounds.push(newRoundData);
      const newUserData = {accountData: this.state.userData.accountData,
                           identityData: this.state.userData.identityData,
                           speedgolfData: this.state.userData.speedgolfData,
                           rounds: newRounds};
      this.setState({userData: newUserData});
      return("New round logged.");
    } else { 
      const resText = await res.text();
      return("New Round could not be logged. " + resText);
    }
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

  deleteRound = async(id) => {
    const url = "/rounds/" + this.state.userData.accountData.id + "/" + id;
    let res = await fetch(url, {
      method: 'DELETE',
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                    },
              method: 'DELETE'
    });
    if (res.status == 201) { 
      const newRounds = [...this.state.userData.rounds];

      let i;
      for (i = 0; i < newRounds.length; i++)
      {
        if (newRounds[i]._id === id)
        {
          newRounds.splice(i, 1);
        }
      }

      const newUserData = {accountData: this.state.userData.accountData,
        identityData: this.state.userData.identityData,
        speedgolfData: this.state.userData.speedgolfData,
        rounds: newRounds};
      this.setState({userData: newUserData});
      return("Round deleted.");
    }
    else {
      const resText = await res.text();
      return("Round could not be deleted. " + resText);
    }
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
        updateUserData={this.startProfileEdit}/>
        {this.state.editingProfile ? null :
        <ModeTabs mode={this.state.mode}
                  setMode={this.setMode} 
                  menuOpen={this.state.menuOpen}
                  modalOpen={this.state.modalOpen}/>}
        {this.state.menuOpen  ? <SideMenu logOut={this.logOut}/> : null}
        {
          this.state.editingProfile ?
          <ProfileSettings  userData={this.state.userData}
                            accountExists={this.accountExists}
                            updateUserData={this.updateUserData}
                            cancel={this.cancelProfileEdit}/> :
          {LoginMode:
            <LoginPage modalOpen={this.state.modalOpen}
                       toggleModalOpen={this.toggleModalOpen} 
                       logInUser={this.logInUser}
                       createAccount={this.createAccount}
                       accountExists={this.accountExists}
                       authenticateUser={this.authenticateUser}/>, 
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