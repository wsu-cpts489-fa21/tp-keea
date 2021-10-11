import React from 'react';
import NavBar from './NavBar.js';
import ModeTabs from './ModeTabs.js';
import LoginPage from './LoginPage.js';
import AppMode from './AppMode.js';

class App extends React.Component {

  constructor() {
    super();
    this.state = {mode: AppMode.LOGIN};
  }

  handleChangeMode = (newMode) => {
    this.setState({mode: newMode});
  }

  render() {
    return (
      <>
        <NavBar mode={this.state.mode}/>
        {this.state.mode !== AppMode.LOGIN ? 
          <ModeTabs mode={this.state.mode}
                    changeMode={this.handleChangeMode} /> 
            : null }
        <LoginPage changeMode={this.handleChangeMode} />
      </>
    ); 
  }

}
export default App;
