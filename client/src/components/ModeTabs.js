import React from 'react';
import AppMode from './AppMode';
/*
   ModeTabs function implements each of the ModeTabs including:
   FEED, ROUNDS, COURSES, and BUDDIES. ModeTabs has been 
   reimplemented to support React Hooks.
*/
function ModeTabs(props) {
    return(
    (props.mode !== AppMode.LOGIN && !props.modalOpen) ?
    <div id="modeTabs" 
            className={"modetab-container" + (props.menuOpen ? " disabled" : "")}  
            role="tablist" 
            aria-label="App Modes">
        <button id="feedMode" type="button" 
            className={"modetab-btn" + 
                (props.mode === AppMode.FEED ? " modetab-selected" : "")}
            role="tab" tabIndex="0" aria-selected="true" 
            aria-controls="feedModeTab"
            onClick={() => props.setMode(AppMode.FEED)}>
            Feed
        </button>
        <button id="roundsMode" type="button" 
            className={"modetab-btn" +  
                (props.mode === AppMode.ROUNDS ? " modetab-selected" : "")} 
            role="tab" tabIndex="-1" aria-selected="false" 
            aria-controls="roundsModeTab"
            onClick={() => props.setMode(AppMode.ROUNDS)}>
            Rounds
        </button>
        <button id="coursesMode" type="button" 
            className={"modetab-btn" +  
                (props.mode === AppMode.COURSES ? " modetab-selected" : "")} 
            role="tab" tabIndex="-1" aria-selected="false" 
            aria-controls="coursesModeTab"
            onClick={() => props.setMode(AppMode.COURSES)}>
            Courses
        </button>
        <button id="buddiesMode" type="button" 
            className={"modetab-btn" +  
                (props.mode === AppMode.BUDDIES ? " modetab-selected" : "")} 
            role="tab" tabIndex="-1" aria-selected="false" 
            aria-controls="buddiesModeTab"
            onClick={() => props.setMode(AppMode.BUDDIES)}>
            Buddies
        </button>
    </div> : null
    );
}

export default ModeTabs;