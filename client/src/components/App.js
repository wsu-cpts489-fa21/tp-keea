import React from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWindowClose, faEdit, faCalendar,
  faSpinner, faSignInAlt, faBars, faTimes, faSearch,
  faSort, faTrash, faEye, faUserPlus, faUserEdit, faMap, faInfo,
  faPencilAlt, faCheck
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
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

library.add(faWindowClose, faEdit, faCalendar,
  faSpinner, faSignInAlt, faBars, faTimes, faSearch,
  faSort, faTrash, faEye, faUserPlus, faGithub, faUserEdit,
  faGoogle, faMap, faInfo, faPencilAlt, faCheck);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: AppMode.LOGIN,
      menuOpen: false,
      modalOpen: false,
      editingProfile: false,
      userData: {
        accountData: {},
        identityData: {},
        speedgolfData: {},
        rounds: [],
        badges: [],
        roundCount: 0
      },
      courses: [],
      authenticated: false,
      badges: [
        {
          icon: 'flag',
          name: 'Starting Off!',
          description: 'Log 1 round of Speedgolf',
          obtained: false,
        },
        {
          icon: 'flag',
          name: 'Picking up Paces',
          description: 'Log 10 rounds of Speedgolf',
          obtained: false,
        },
        {
          icon: 'flag',
          name: 'Speedgolf step',
          description: 'Log 20 rounds of Speedgolf',
          obtained: false,
        },
        {
          icon: 'flag',
          name: 'Speedgolf is my Passion',
          description: 'Log 30 rounds of Speedgolf',
          obtained: false,
        },
        {
          icon: 'flag',
          name: 'Streak-Starter',
          description: 'Get a streak of 10 rounds, each within 60 minutes',
          obtained: false,
        },
        {
          icon: 'flag',
          name: 'Endurance',
          description: 'Make over 90 strokes in a round',
          obtained: false,
        }
      ],
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClick, true);
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
    this.setState({
      mode: AppMode.LOGIN,
      userData: {
        accountData: {},
        identityData: {},
        speedgolfData: {},
        rounds: [],
        badges: []
      },
      courses: [],
      authenticated: false,
      menuOpen: false,
      modalOpen: false
    });
  }

  //User interface state management methods

  setMode = (newMode) => {
    this.setState({ mode: newMode });
  }

  toggleMenuOpen = () => {
    this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));
  }

  toggleModalOpen = () => {
    this.setState(prevState => ({ dialogOpen: !prevState.dialogOpen }));
  }

  //Account Management methods

  accountExists = async (email) => {
    const res = await fetch("/user/" + email);
    return (res.status === 200);
  }

  getAccountData = (email) => {
    return JSON.parse(localStorage.getItem(email));
  }

  authenticateUser = async (id, pw) => {
    const url = "/auth/login?username=" + id +
      "&password=" + pw;
    const res = await fetch(url, { method: 'POST' });
    return (res.status == 200)
  }

  logInUser = (userObj) => {
    this.setState({
      userData: userObj,
      mode: AppMode.FEED,
      authenticated: true
    });
  }

  createRound = async (data) => {
    const url = '/courses/' + data.courseData.id;
    const response = await fetch(url, { 
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (response.status === 201) {
      return (`New Course logged with id ${data.courseData.id}`);
    } else {
      const responseText = await response.text();
      return (`New course was not created. ${responseText}`);
    }
  }

  createAccount = async (data) => {
    const url = '/users/' + data.accountData.id;
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (res.status == 201) {
      return ("New account created with email " + data.accountData.id);
    } else {
      const resText = await res.text();
      return ("New account was not created. " + resText);
    }
  }

  updateUserData = async (data) => {
    const url = '/users/' + this.state.userData.accountData.id;
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(data)
    });
    if (res.status == 200) {
      const newUserData = data;
      this.setState({ userData: newUserData });
      return ("Account with email " + data.accountData.id + " updated");
    }
    else {
      const resText = await res.text();
      return ("Account was not updated. " + resText);
    }
  }

  startProfileEdit = () => {
    this.setState({ editingProfile: true });
  }

  cancelProfileEdit = () => {
    this.setState({ editingProfile: false });
  }

  //Round Management methods

  addRound = async (newRoundData) => {
    const url = "/rounds/" + this.state.userData.accountData.id;
    let res = await fetch(url, {
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
      const newUserData = {
        accountData: this.state.userData.accountData,
        identityData: this.state.userData.identityData,
        speedgolfData: this.state.userData.speedgolfData,
        rounds: newRounds,
        badges: this.state.userData.badges
      };
      this.setState({ userData: newUserData });
      this.checkBadges();
      return ("New round logged.");
    } else {
      const resText = await res.text();
      return ("New Round could not be logged. " + resText);
    }
  }

  updateBadge = async (newBadgeData) => {
    const url = "/badges/" + this.state.userData.accountData.id + "/" + newBadgeData.name;
    let res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(newBadgeData)
    });
    if (res.status == 201) {
      return ("Badge updated.");
    } else {
      const resText = await res.text();
      return ("Badge could not be updated. " + resText);
    }
  }

  checkBadges = async () => {
    const rounds = this.state.userData.rounds;
    const roundCount = rounds.length;

    console.log(`This states roundcount is ${roundCount}`);

    // If user has logged 1 round
    if (roundCount >= 1 && !this.state.userData.badges[0].obtained) {
      // Need code to check if badge already unlocked
      console.log("Badge Unlocked! First Round Badge!");
      const currentBadges = this.state.userData.badges;
      currentBadges[0].obtained = true;
      this.setState({
        badges: currentBadges,
      });
      
      this.updateBadge(currentBadges[0]);
    }

    // If user has logged 20 rounds
    if (roundCount >= 20) {
      // Need code to check if badge already unlocked
      console.log("Badge Unlocked! 20 Rounds Badge!");
    }

    // If user has logged 30 rounds
    if (roundCount >= 30) {
      // Need code to check if badge already unlocked
      console.log("Badge Unlocked! 30 Rounds Badge!");
    }

    // Check if most recent round was less than 30 minutes
    if (rounds[rounds.length - 1].minutes < 30 && !this.state.userData.badges[1].obtained)
    {
      console.log("Badge Unlocked! Speed badge 1!");
      const currentBadges = this.state.userData.badges;
      currentBadges[1].obtained = true;
      this.setState({
        badges: currentBadges,
      });
      
      this.updateBadge(currentBadges[1]);
    }

    // Check if most recent round strokes is 72 (average par)
    if (rounds[rounds.length - 1].strokes == 72 && !this.state.userData.badges[2].obtained)
    {
      console.log("Badge Unlocked! Par badge 1!");
      const currentBadges = this.state.userData.badges;
      currentBadges[2].obtained = true;
      this.setState({
        badges: currentBadges,
      });
      
      this.updateBadge(currentBadges[2]);
    }

    // Rounds iteration
    var streakRound = null;
    var streakCount = 0;

    // If user has streak of rounds
    if (rounds == null) {
      return;
    }
    for (const round of rounds) {
      // Can start measuring streak if streakRound not null
      if (streakRound != null) {

        const oldDate = new Date(streakRound.date);
        const newDate = new Date(round.date);

        // If user logs series of rounds within the same day, increase streak
        if (oldDate.toDateString() == newDate.toDateString()) {
          if (streakCount == 0)
          {
            streakCount += 2;
          }
          else {
            streakCount++;
          }
        }
      }

      // If streak is 2+, unlock badge
      if (streakCount >= 2 && !this.state.userData.badges[3].obtained) {
        console.log("Badge Unlocked! Golfing Spree Badge!");
        const currentBadges = this.state.userData.badges;
        currentBadges[3].obtained = true;
        this.setState({
          badges: currentBadges,
        });
        
        this.updateBadge(currentBadges[3]);
      } else {
        streakRound = round;
      }
    }
  }

  updateRound = async (newRoundData) => {
    const url = "/rounds/" + this.state.userData.accountData.id + "/" + newRoundData._id;
    let res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(newRoundData)
    });
    if (res.status == 201) {
      const newRounds = [...this.state.userData.rounds];

      let i;
      for (i = 0; i < newRounds.length; i++) {
        if (newRounds[i]._id === newRoundData._id) {
          newRounds[i] = newRoundData;
        }
      }

      const newUserData = {
        accountData: this.state.userData.accountData,
        identityData: this.state.userData.identityData,
        speedgolfData: this.state.userData.speedgolfData,
        rounds: newRounds,
        badges: this.state.userData.badges
      };
      this.setState({ userData: newUserData });
      return ("Round updated.");
    } else {
      const resText = await res.text();
      return ("Round could not be updated. " + resText);
    }
  }

  deleteRound = async (id) => {
    const url = "/rounds/" + this.state.userData.accountData.id + "/" + id;
    let res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    });
    if (res.status == 201) {
      const newRounds = [...this.state.userData.rounds];

      let i;
      for (i = 0; i < newRounds.length; i++) {
        if (newRounds[i]._id === id) {
          newRounds.splice(i, 1);
        }
      }

      const newUserData = {
        accountData: this.state.userData.accountData,
        identityData: this.state.userData.identityData,
        speedgolfData: this.state.userData.speedgolfData,
        rounds: newRounds,
        badges: this.state.userData.badges
      };
      this.setState({ userData: newUserData });
      return ("Round deleted.");
    }
    else {
      const resText = await res.text();
      return ("Round could not be deleted. " + resText);
    }
  }

  // Course management methods

  retrieveCourses = async () => {
    let res = await fetch('/courses/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    .then((response) => response.json())
    .then((payload => {
      this.setState({
        courses: payload,
      });
    }));

    if (res.status === 201) {
      // console.log(res.json());
      /*this.setState({
        courses: res,
      });*/
      return ("Courses Retrieved");
    }
    else {
      const resText = await res.text();
      return ("Courses could not be retrieved. " + resText);
    }
  }

  addCourse = async (newCourseData) => {
    const url = "/courses/" + newCourseData.courseName;
    let res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(newCourseData)
    });
    if (res.status == 201) {
      const newCourses = [...this.state.courses];
      newCourses.push(newCourseData);
      this.setState({ courses: newCourses });
      return ("New course logged.");
    } else {
      const resText = await res.text();
      return ("New course could not be logged. " + resText);
    }
  }

  updateCourse = async (newCourseData) => {
    const url = "/courses/" + newCourseData.courseName;
    let res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(newCourseData)
    });
    if (res.status == 200) {
      const newCourses = [...this.state.courses];

      let i;
      for (i = 0; i < newCourses.length; i++) {
        if (newCourses[i].courseName === newCourseData.courseName) {
          newCourses[i] = newCourseData;
        }
      }

      this.setState({ courses: newCourses });
      return ("Course updated.");
    } else {
      const resText = await res.text();
      return ("Course could not be updated. " + resText);
    }
  }

  deleteCourse = async (id) => {
    const url = "/courses/" + id;
    let res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    });
    if (res.status == 201) {
      const newCourses = [...this.state.courses];

      let i;
      for (i = 0; i < newCourses.length; i++) {
        if (newCourses[i].courseName === id) {
          newCourses.splice(i, 1);
        }
      }
      this.setState({ courses: newCourses });
      return ("Course deleted.");
    }
    else {
      const resText = await res.text();
      return ("Course could not be deleted. " + resText);
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
          updateUserData={this.startProfileEdit} />
        {this.state.editingProfile ? null :
          <ModeTabs mode={this.state.mode}
            setMode={this.setMode}
            menuOpen={this.state.menuOpen}
            modalOpen={this.state.modalOpen} />}
        {this.state.menuOpen ? <SideMenu logOut={this.logOut} /> : null}
        {
          this.state.editingProfile ?
            <ProfileSettings userData={this.state.userData}
              accountExists={this.accountExists}
              updateUserData={this.updateUserData}
              cancel={this.cancelProfileEdit} /> :
            {
              LoginMode:
                <LoginPage modalOpen={this.state.modalOpen}
                  toggleModalOpen={this.toggleModalOpen}
                  logInUser={this.logInUser}
                  createAccount={this.createAccount}
                  accountExists={this.accountExists}
                  authenticateUser={this.authenticateUser} />,
              FeedMode:
                <FeedPage modalOpen={this.state.modalOpen}
                  toggleModalOpen={this.toggleModalOpen}
                  menuOpen={this.state.menuOpen}
                  userId={this.state.userId} />,
              RoundsMode:
                <RoundsPage rounds={this.state.userData.rounds}
                  addRound={this.addRound}
                  updateRound={this.updateRound}
                  deleteRound={this.deleteRound}
                  modalOpen={this.state.modalOpen}
                  toggleModalOpen={this.toggleModalOpen}
                  menuOpen={this.state.menuOpen}
                  userId={this.state.userId} 
                  badges={this.state.userData.badges} />,
              CoursesMode:
                <CoursesPage modalOpen={this.state.modalOpen}
                  courses={this.state.courses}
                  addCourse={this.addCourse}
                  updateCourse={this.updateCourse}
                  deleteCourse={this.deleteCourse}
                  toggleModalOpen={this.toggleModalOpen}
                  retrieveCourses={this.retrieveCourses}
                  menuOpen={this.state.menuOpen}
                  userId={this.state.userId} />,
              BuddiesMode:
                <BuddiesPage modalOpen={this.state.modalOpen}
                  toggleModalOpen={this.toggleModalOpen}
                  menuOpen={this.state.menuOpen}
                  userId={this.state.userId} />
            }[this.state.mode]
        }
      </>
    );
  }

}
export default App;