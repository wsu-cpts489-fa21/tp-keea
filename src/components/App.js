import React from 'react';
import NavBar from './NavBar.js';
import ModeTabs from './ModeTabs.js';
import LoginPage from './LoginPage.js';
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
        {this.state.mode !== AppMode.LOGIN ? 
          <ModeTabs mode={this.state.mode}
                    setMode={this.setMode} 
                    menuOpen={this.state.menuOpen}
                    modalOpen={this.state.modalOpen}/> 
            : null }
        <LoginPage changeMode={this.handleChangeMode}
                   menuOpen={this.state.menuOpen}
                   modalOpen={this.state.dialogOpen}
                   toggleModalOpen={this.state.toggleModalOpen} 
                   userid={this.state.userId}/>
      </>
    ); 
  }

}
export default App;
