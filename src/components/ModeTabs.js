import React from 'react';

class ModeTabs extends React.Component {
    render() {
      return(
        <div id="modeTabs" className="modetab-container" role="tablist" 
            aria-label="App Modes">
            <button id="feedMode" type="button" 
                className="modetab-btn modetab-selected" 
                role="tab" tabIndex="0" aria-selected="true" 
                aria-controls="feedModeTab">
            Feed
            </button>
            <button id="roundsMode" type="button" 
                className="modetab-btn" 
                role="tab" tabIndex="-1" aria-selected="false" 
                aria-controls="roundsModeTab">
            Rounds
            </button>
            <button id="coursesMode" type="button" 
                className="modetab-btn" 
                role="tab" tabIndex="-1" aria-selected="false" 
                aria-controls="coursesModeTab">
            Courses
            </button>
            <button id="buddiesMode" type="button" 
                className="modetab-btn" 
                role="tab" tabIndex="-1" aria-selected="false" 
                aria-controls="buddiesModeTab">
            Buddies
            </button>
      </div>
      );
    }
}

export default ModeTabs;
