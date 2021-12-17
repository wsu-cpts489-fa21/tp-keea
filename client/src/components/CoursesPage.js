import React from 'react';
import CoursesMode from './CoursesMode.js';
import CoursesTable from './CoursesTable.js';
import CourseForm from './CourseForm';
import TeeForm from './TeeForm.js';
import FloatingButton from './FloatingButton.js';
import PopUpModal from './PopUpModal.js';
import ReviewPage from './ReviewPage.js';

class CoursesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: CoursesMode.COURSESTABLE,
            deleteId: -1,
            editId: -1,
            reviewId: -1,
            courseData: null,
        }
    }

    componentDidMount() {
        this.props.retrieveCourses();
    }

    modalRetrieveCourse() {
        this.props.retrieveCourses();
    }

    setMode = (newMode) => {
        this.setState({
            mode: newMode,
        });
    }

    initiateViewReviewPage = (val) => {
        this.setState({
            reviewId: val,
            mode: CoursesMode.REVIEWPAGE,
        });
    }

    initiateEditCourse = (val) => {
        this.setState({
            editId: val,
            mode: CoursesMode.EDITCOURSE,
        },
            this.props.toggleModalOpen);
    }

    initiateDeleteCourse = (val) => {
        this.setState({ deleteId: val });
    }

    completeDeleteCourse = () => {
        this.props.deleteCourse(this.props.courses[this.state.deleteId].courseName);
        this.setState({ deleteId: -1 });
    }

    cancelDeleteCourse = () => {
        this.setState({ deleteId: -1 });
    }

    render() {
        switch (this.state.mode) {
            case CoursesMode.COURSESTABLE:
                return (
                    <>
                        {this.state.deleteId > -1 ?
                            <PopUpModal
                                id={"Delete Course"}
                                text={"Press Yes to delete the course, or No to cancel"}
                                choices={{ Yes: this.completeDeleteCourse, No: this.cancelDeleteCourse }}
                            />
                            : null}
                        <CoursesTable courses={this.props.courses}
                            initiateDeleteCourse={this.initiateDeleteCourse}
                            deleteCourse={this.props.deleteCourse}
                            deleteId={this.state.deleteId}
                            initiateEditCourse={this.initiateEditCourse}
                            initiateViewReviewPage={this.initiateViewReviewPage}
                            updateCourse={this.props.updateCourse}
                            setMode={this.setMode}
                            toggleModalOpen={this.props.toggleModalOpen}
                            menuOpen={this.props.menuOpen} />
                        {this.state.deleteId === -1 || this.state.reviewId === -1?
                            <FloatingButton
                                icon="calendar"
                                label={"Add Course"}
                                menuOpen={this.props.menuOpen}
                                action={() => this.setState({ mode: CoursesMode.ADDCOURSE },
                                    this.props.toggleModalOpen)} />
                            : null}
                    </>
                );
            case CoursesMode.ADDCOURSE:
                return (
                    <CourseForm mode={this.state.mode}
                        courseData={null}
                        saveCourse={this.props.addCourse}
                        setMode={this.setMode}
                        toggleModalOpen={this.props.toggleModalOpen} />
                );
            case CoursesMode.EDITCOURSE:
                return (
                    <CourseForm
                        mode={this.state.mode}
                        editId={this.state.editId}
                        courseData={this.props.courses[this.state.editId]}
                        saveCourse={this.props.updateCourse}
                        setMode={this.setMode}
                        retrieveCourses={this.props.retrieveCourses}
                        toggleModalOpen={this.props.toggleModalOpen} />
                );
            case CoursesMode.ADDTEE:
                return (
                    <TeeForm
                        mode={this.state.mode}
                        courseData={null}
                        setMode={this.setMode}
                        toggleModalOpen={this.props.toggleModalOpen} />
                );
            case CoursesMode.REVIEWPAGE:
                return (
                    <ReviewPage
                        mode={this.state.mode}
                        reviewId={this.state.reviewId}
                        courseData={this.props.courses[this.state.reviewId]}
                        setMode={this.setMode}
                        toggleModalOpen={this.props.toggleModalOpen} />
                );
            default: return (null);
        }
    }
}

export default CoursesPage;