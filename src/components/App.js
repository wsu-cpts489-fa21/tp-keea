import React from 'react';
import NavBar from './NavBar.js';
import ModeTabs from './ModeTabs.js';
import LoginPage from './LoginPage.js';
import AppMode from './AppMode.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {mode: AppMode.LOGIN};
  }

  setMode = (newMode) => {
    this.setState({mode: newMode});
  }

  render() {
    return (
      <>
        <NavBar mode={this.state.mode}
                />
        {this.state.mode !== AppMode.LOGIN ? 
          <ModeTabs mode={this.state.mode}
                    setMode={this.setMode} /> 
            : null }
        <LoginPage setMode={this.setMode} />
      </>
    ); 
  }

}
export default App;
