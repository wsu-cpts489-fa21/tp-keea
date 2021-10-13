import React from 'react';
import AppMode from './AppMode';

class ModeTabs extends React.Component {
    render() {
      return(
        (this.props.mode !== AppMode.LOGIN && !this.props.modalOpen) ?
        <div id="modeTabs" 
             className={"modetab-container" + (this.props.menuOpen ? " disabled" : "")}  
             role="tablist" 
             aria-label="App Modes">
            <button id="feedMode" type="button" 
                className={"modetab-btn" + 
                  (this.props.mode === AppMode.FEED ? " modetab-selected" : "")}
                role="tab" tabIndex="0" aria-selected="true" 
                aria-controls="feedModeTab"
                onClick={() => this.props.setMode(AppMode.FEED)}>
                Feed
            </button>
            <button id="roundsMode" type="button" 
                className={"modetab-btn" +  
                    (this.props.mode === AppMode.ROUNDS ? " modetab-selected" : "") } 
                role="tab" tabIndex="-1" aria-selected="false" 
                aria-controls="roundsModeTab"
                onClick={() => this.props.setMode(AppMode.ROUNDS)}>
                Rounds
            </button>
            <button id="coursesMode" type="button" 
                className={"modetab-btn" +  
                    (this.props.mode === AppMode.COURSES ? " modetab-selected" : "") } 
                role="tab" tabIndex="-1" aria-selected="false" 
                aria-controls="coursesModeTab"
                onClick={() => this.props.setMode(AppMode.COURSES)}>
                Courses
            </button>
            <button id="buddiesMode" type="button" 
                className={"modetab-btn" +  
                    (this.props.mode === AppMode.BUDDIES ? " modetab-selected" : "") } 
                role="tab" tabIndex="-1" aria-selected="false" 
                aria-controls="buddiesModeTab"
                onClick={() => this.props.setMode(AppMode.BUDDIES)}>
                Buddies
            </button>
        </div> : null
        );
    }
}

export default ModeTabs;
