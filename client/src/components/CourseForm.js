import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import CoursesMode  from './CoursesMode.js'

class CoursesForm extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.mode === CoursesMode.ADDCOURSE) {
            this.state = {
                courseName: "",
                courseAddress: "",
                phoneNumber: "",
                geolocation: "",
                picture: "",
                tees: [],
                btnIcon: "calendar",
                btnLabel: "Add Course",
            }
        } else {
            this.state = this.props.courseData;
            this.state.btnIcon = "edit";
            this.state.btnLabel = "Update Course";
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmit = (event) => {

    }

    render() {
        return (
            <div id="coursesModeDialog" className="mode-page action-dialog" role="dialog" aria-modal="true" aria-labelledby="courseFormHeader" tabIndex="0">
                <h1 id="roundFormHeader" className="mode-page-header">
                    {this.props.mode === CoursesMode.ADDCOURSE ? "Add Course" : "Edit Course"}
                </h1>
                <form id="addCourseForm" onSubmit={this.handleSubmit} noValidate>
                    {/* Course Name Field */}
                    <div className="mb-3 centered">
                        <label htmlFor="courseName" className="form-label">
                            Course Name:
                            <input id="courseName" name="courseName" className="form-control centered" type="text" aria-describedby="courseNameDescr" size="50" maxLength="50" value={this.state.courseName} onChange={this.handleChange} required/>
                        </label>
                        <div id="courseNameDescr" className="form-text">
                            Enter a course name of at most 50 characters
                        </div>
                    </div>
                    {/* Course Address Field */}
                    <div className="mb-3 centered">
                        <label htmlFor="courseAddress" className="form-label">
                            Address:
                            <input id="courseAddress" name="courseAddress" className="form-control centered" type="text" aria-describedby="courseAddressDescr" value={this.state.courseAddress} onChange={this.handleChange} required/>
                        </label>
                        <div id="courseAddressDescr" className="form-text">
                            Enter a valid course address
                        </div>
                    </div>
                    {/* Course Phone Number Field */}
                    <div className="mb-3 centered">
                        <label htmlFor="coursePhoneNumber" className="form-label">
                            Phone Number:
                            <input id="coursePhoneNumber" name="phoneNumber" className="form-control centered" type="number" aria-describedby="coursePhoneNumberDescr" value={this.state.phoneNumber} onChange={this.handleChange}/>
                        </label>
                        <div id="coursePhoneNumberDescr" className="form-text">
                            Enter an optional course phone number
                        </div>
                    </div>
                    {/* Course Geolocation Field */}
                    <div className="mb-3 centered">
                        <label htmlFor="courseGeolocation" className="form-label">
                            Geolocation:
                            <input id="courseGeolocation" name="geolocation" className="form-control centered" type="text" aria-describedby="courseGeolocationDescr" value={this.state.geolocation} onChange={this.handleChange}/>
                        </label>
                        <div id="courseGeolocationDescr" className="form-text">
                            Enter optional course geolocation
                        </div>
                    </div>
                    {/* Course Picture Field */}
                    <div className="mb-3 centered">
                        <label htmlFor="coursePicture" className="form-label">
                            <input id="coursePicture" name="picture" type="button" aria-describedby="coursePictureDescr" value="Submit a Picture" onChange={this.handleChange}/>
                        </label>
                        <div id="coursePictureDescr" className="form-text">
                            Submit an optional course picture
                        </div>
                    </div>
                    {/* Course Tee Field */}
                    <div className="mb-3 centered">
                        <label htmlFor="courseTee" className="form-label">
                            <input id="courseTee" name="tees" type="button" aria-describedby="courseTeeDescr" value="Add a Tee" onChange={this.handleChange}/>
                        </label>
                        <div id="courseTeeDescr" className="form-text">
                            Add optional course tee
                        </div>
                    </div>
                    {/* Button Container*/}
                    <div className="mode-page-btn-container">
                        <button type="submit" className="mode-page-btn action-dialog action-button">
                            <FontAwesomeIcon icon={this.state.btnIcon} className={this.state.btnIcon === "spinner" ? "fa-spin" : ""}/>
                            <span>&nbsp;{this.state.btnLabel}</span>
                        </button>
                        <button type="button" className="mode-page-btn-cancel action-dialog cancel-button" onClick={() => {this.props.setMode(CoursesMode.COURSESTABLE); this.props.toggleModalOpen();}}>
                            <FontAwesomeIcon icon="window-close"/>
                            <span>&nbsp;Cancel</span>
                        </button>
                    </div>
                </form>
            </div>
        ); 
    }
}

export default CoursesForm;