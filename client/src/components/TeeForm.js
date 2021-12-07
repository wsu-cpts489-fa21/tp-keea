import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import CoursesMode from './CoursesMode.js';

class TeeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teeName: "",
            teeGolfingYardage: "",
            teeRunningYardage: "",
            teeNumberOfHoles: "",
        }
    }

    handleSubmit = (event) => {}

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value,
        });
    }

    render() {
        return (
            <div id="coursesModeTeeDialog" className="mode-page action-dialog" role="dialog" aria-modal="true" aria-labelledby="courseTeeFormHeader" tabIndex="0">
                <h1 id="courseTeeFormHeader" className="mode-page-header">
                    {this.props.mode === CoursesMode.ADDCOURSE ? "Add Tee" : "Edit Tee"}
                </h1>
                <form id="addTeeForm" onSubmit={this.handleSubmit} noValidate>
                    {/* Tee Name Field */}
                    <div className="mb-3 centered">
                        <label htmlFor="teeName" className="form-label">
                            Tee Name:
                            <input id="teeName" name="teeName" className="form-control-centered" type="text" aria-describedby="teeNameDescr" size="50" maxLength="50" value={this.state.teeName} onChange={this.handleChange} required/>
                        </label>
                        <div id="courseNameDescr" className="form-text">
                            Enter a tee name of at most 50 characters
                        </div>
                    </div>
                    {/* Golfing Yardage */}
                    <div className="mb-3 centered">
                        <label htmlFor="teeGolfingYardage" className="form-label">
                            Golfing Yardage:
                            <input id="teeGolfingYardage" name="teeGolfingYardage" className="form-control centered" type="number" aria-describedby="teeGolfingYardageDescr" value={this.state.teeGolfingYardage} onChange={this.handleChange} min="0"/>
                        </label>
                        <div id="teeGolfingYardageDescr" className="form-text">
                            Enter total golfing yardage for tee
                        </div>
                    </div>
                    {/* Running Yardage */}
                    <div className="mb-3 centered">
                        <label htmlFor="teeRunningYardage" className="form-label">
                            Running Yardage:
                            <input id="teeRunningYardage" name="teeRunningYardage" className="form-label centered" type="number" aria-describedby="teeRunningYardageDescr" value={this.state.teeRunningYardage} onChange={this.handleChange} min="0"/>
                        </label>
                        <div id="teeRunningYardageDescr" className="form-text">
                            Enter total running yardage for tee
                        </div>
                    </div>
                    {/* Number of holes */}
                    <div className="mb-3 centered">
                        <label htmlFor="teeNumberOfHoles" className="form-label">
                            <input id="teeNumberOfHoles" name="teeNumberOfHoles" className="form-label centered" type="number" aria-describedby="teeNumberOfHolesDescr" value={this.state.teeNumberOfHoles} onChange={this.handleChange} min="0"/>
                        </label>
                        <div id="teeNumberOfHolesDescr" className="form-text">
                            Enter total number of holes for tee
                        </div>
                    </div>
                    {/* Button Container */}
                    <div className="mode-page-btn-container">
                        <button type="submit" className="mode-page-btn action-dialog action-button">
                            <FontAwesomeIcon icon="calendar"/>
                            <span>&nbsp;Submit Tee</span>
                        </button>
                        <button type="button" className="mode-page-btn-cancel action-dialog cancel-button" onClick={() => {this.props.setMode(CoursesMode.ADDCOURSE); this.props.toggleModalOpen();}}>
                            <FontAwesomeIcon icon="window-close"/>
                            <span>&nbsp;Cancel</span>
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default TeeForm;