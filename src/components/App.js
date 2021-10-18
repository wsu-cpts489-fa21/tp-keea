import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core"; 
import { faWindowClose, faEdit, faCalendar, 
        faSpinner, faSignInAlt, faBars, faSearch,
        faSort, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import NavBar from './NavBar.js';
import ModeTabs from './ModeTabs.js';
import LoginPage from './LoginPage.js';
import FeedPage from './FeedPage.js';
import RoundsPage from './RoundsPage.js';
import CoursesPage from './CoursesPage.js';
import BuddiesPage from './BuddiesPage.js';
import AppMode from './AppMode.js';

library.add(faWindowClose,faEdit, faCalendar, 
            faSpinner, faSignInAlt, faBars, faSearch,
            faSort, faTrash, faEye);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {mode: AppMode.LOGIN,
                  menuOpen: false,
                  modalOpen: false,
                  userData: {}};
  }

  setMode = (newMode) => {
    this.setState({mode: newMode});
  }

  toggleMenuOpen = () => {
    this.setState(prevState => ({menuOpen: !prevState.menuOpen}));
  }

  toggleModalOpen = () => {
    this.setState(prevState => ({dialogOpen: !prevState.dialogOpen}));
  }

  setUserId = (id) => {
    this.setState(
      {userData: {
          accountData: {
            email: id,
            password: "",
            securityQuestion: "",
            securityAnswer: ""
          },
          identityData: {
            displayName: id,
            profilePic: "images/DefaultProfilePic.jpg"
          },
          speedgolfProfileData: {
            bio: "",
            firstRound: "",
            personalBest: {},
            homeCourse: "",
            clubs: {},
            clubComments: ""
        },
        rounds: [],
        roundCount: 0
        }
     }
    );
  }

  addRound = (newRoundData) => {
    const newRounds = [...this.state.userData.rounds];
    const newRoundCount = this.state.userData.roundCount + 1;
    newRoundData.roundNum = newRoundCount;
    newRounds.push(newRoundData);
    this.setState({userData: {accountData: this.state.userData.accountData,
                              identityData: this.state.userData.identityData,
                              speedgolfProfileData: this.state.userData.speedgolfProfileData,
                              rounds: newRounds, 
                              roundCount: newRoundCount}
                  });
  }

  updateRound = (id, newRoundData) => {
    const newRounds = [...this.state.userData.rounds];
    let r;
    for (r = 0; r < newRounds.length; ++r) {
        if (newRounds[r].roundNum === id) {
            break;
        }
    }
    newRounds[r] = newRoundData;
    this.setState({userData: 
        {accountData: this.state.userData.accountData,
        identityData: this.state.userData.identityData,
        speedgolfProfileData: this.state.userData.speedgolfProfileData,
        rounds: newRounds, 
        roundCount: this.state.userData.roundCount
      }
    });
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
    this.setState({userData: {accountData: this.state.userData.accountData,
      identityData: this.state.userData.identityData,
      speedgolfProfileData: this.state.userData.speedgolfProfileData,
      rounds: newRounds, 
      roundCount: this.state.userData.roundCount}
    });
  }

  render() {
    return (
      <>
        <NavBar mode={this.state.mode}
                menuOpen={this.state.menuOpen}
                toggleMenuOpen={this.state.toggleMenuOpen}
                modalOpen={this.state.modalOpen}
                toggleModalOpen={this.toggleModalOpen}
                userId={this.state.userId}
                setUserId={this.setUserid} /> 
        <ModeTabs mode={this.state.mode}
                  setMode={this.setMode} 
                  menuOpen={this.state.menuOpen}
                  modalOpen={this.state.modalOpen}/> 
        {
          {LoginMode:
            <LoginPage setMode={this.setMode}
                       modalOpen={this.state.modalOpen}
                       toggleModalOpen={this.toggleModalOpen} 
                       setUserId={this.setUserId}/>, 
          FeedMode:
            <FeedPage modalOpen={this.state.modalOpen}
                      toggleModalOpen={this.toggleModalOpen} 
                      menuOpen={this.state.menuOpen}
                      userId={this.state.userId}/>,
          RoundsMode:
            <RoundsPage rounds={this.state.userData.rounds}
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
