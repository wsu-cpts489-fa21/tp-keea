import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class FloatingButton extends React.Component {
    
    render() {
       return (
        <button id="roundsModeActionBtn"  type="button" 
                className="float-btn" onClick={this.props.action}>
          <FontAwesomeIcon icon={this.props.icon}/>
            &nbsp;{this.props.label}
        </button>
    ); 
  }
}

export default FloatingButton;