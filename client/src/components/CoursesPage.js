import React from 'react';
import logo from '../images/sslogo2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CoursesMode from './CoursesMode.js';
import CourseForm from './CourseForm';
import TeeForm from './TeeForm.js';
import FloatingButton from './FloatingButton.js';

class CoursesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: CoursesMode.COURSESTABLE,
            deletedId: -1,
            editId: -1
        }
    }

    setMode = (newMode) => {
        this.setState({
            mode: newMode,
        });
    }

    toggleModalOpen = () => {
        // To be filled...
    }

    render() {
        switch (this.state.mode) {
            case CoursesMode.COURSESTABLE:
                return (
                    <>
                        <div id="coursesModeTab" className="mode-page" role="tabpanel" aria-label="Courses Tab" tabIndex="0">
                            <h1 className="mode-page-header">Courses</h1>
                            <p className="mode-page-content">This page is under construction.</p>
                            <img className="mode-page-icon" src={logo} alt="SpeedScore logo"></img>
                        </div>
                        <FloatingButton icon="calendar" label={"Add Course"} menuOpen={this.props.menuOpen} action={() => this.setState({mode: CoursesMode.ADDCOURSE}, this.props.toggleModalOpen)} />
                    </>
                );
            case CoursesMode.ADDCOURSE:
            case CoursesMode.EDITCOURSE:
                return (
                    <CourseForm mode={this.state.mode} courseData={null} setMode={this.setMode} toggleModalOpen={this.props.toggleModalOpen} />
                );
            case CoursesMode.ADDTEE:
                return (
                    <TeeForm mode={this.state.mode} courseData={null} setMode={this.setMode} toggleModalOpen={this.props.toggleModalOpen} />
                );
        }
    }
}

export default CoursesPage;