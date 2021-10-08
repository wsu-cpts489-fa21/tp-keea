import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import NavBar from './NavBar.js';
import SideMenu from './SideMenu.js';
import ModeTabs from './ModeTabs.js';
import FloatingButton from './FloatingButton.js';
import LoginPage from './LoginPage.js';


function App() {
  return (
    <div>
      <NavBar title="Welcome to SpeedScore"/>
      <SideMenu />
      <ModeTabs />
      <LoginPage />
    </div>
  ); 
}

export default App;
