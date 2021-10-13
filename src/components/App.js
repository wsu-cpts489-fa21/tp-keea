import React from 'react';
import NavBar from './NavBar.js';
import ModeTabs from './ModeTabs.js';
import LoginPage from './LoginPage.js';
import FeedPage from './FeedPage.js';
import RoundsPage from './RoundsPage.js';
import CoursesPage from './CoursesPage.js';
import BuddiesPage from './BuddiesPage.js';
import AppMode from './AppMode.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {mode: AppMode.LOGIN,
                  menuOpen: false,
                  modalOpen: false,
                  userId: ""};
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

  setUserId = (Id) => {
    this.setState({userId: Id});
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
            <FeedPage  modalOpen={this.state.modalOpen}
                      toggleModalOpen={this.toggleModalOpen} 
                      menuOpen={this.state.menuOpen}
                      userId={this.state.userId}/>,
          RoundsMode:
            <RoundsPage modalOpen={this.state.modalOpen}
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
        } [this.state.mode]
        }
      </>
    ); 
  }

}
export default App;
