import React from 'react';
import AppMode from './AppMode';

class ModeTabs extends React.Component {
    render() {
        const tabClasses = "modetab-btn" + (this.props.menuOpen ? " disabled" : "");
        return (this.props.mode !== AppMode.LOGIN && !this.props.modalOpen ? 
        <div id="modeTabs" className="modetab-container" role="tablist" 
            aria-label="App Modes">
            <button id="feedMode" type="button" 
                className={tabClasses +  
                    (this.props.mode === AppMode.FEED ? "modetab-selected" : "") }
                role="tab" tabIndex="0" aria-selected="true" 
                aria-controls="feedModeTab">
            Feed
            </button>
            <button id="roundsMode" type="button" 
                className={tabClasses +  
                    (this.props.mode === AppMode.ROUNDS ? "modetab-selected" : "") } 
                role="tab" tabIndex="-1" aria-selected="false" 
                aria-controls="roundsModeTab">
            Rounds
            </button>
            <button id="coursesMode" type="button" 
                className={tabClasses +  
                    (this.props.mode === AppMode.COURSES ? "modetab-selected" : "") } 
                role="tab" tabIndex="-1" aria-selected="false" 
                aria-controls="coursesModeTab">
            Courses
            </button>
            <button id="buddiesMode" type="button" 
                className={tabClasses +  
                    (this.props.mode === AppMode.BUDDIES ? "modetab-selected" : "") } 
                role="tab" tabIndex="-1" aria-selected="false" 
                aria-controls="buddiesModeTab">
            Buddies
            </button>
        </div>  : null 
        );
    }
}

export default ModeTabs;
