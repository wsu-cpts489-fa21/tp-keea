import React from 'react';
import CoursesMode from './CoursesMode.js';
import CourseForm from './CourseForm';
import FloatingButton from './FloatingButton.js';
import ReviewTable from './ReviewTable.js';
import ReviewForm from './ReviewForm.js';

class ReviewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: CoursesMode.REVIEWTABLE,
            deleteId: -1,
            editId: -1,
            reviewId: -1,
            courseData: null,
        }
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
            mode: CoursesMode.REVIEWTABLE,
        },
            this.props.toggleModalOpen);
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
            case CoursesMode.REVIEWTABLE:
                return (
                    <>
                        <ReviewTable
                            courses={this.props.courses}
                            initiateDeleteCourse={this.initiateDeleteCourse}
                            deleteCourse={this.props.deleteCourse}
                            deleteId={this.state.deleteId}
                            initiateEditCourse={this.initiateEditCourse}
                            updateCourse={this.props.updateCourse}
                            setMode={this.setMode}
                            toggleModalOpen={this.props.toggleModalOpen}
                            menuOpen={this.props.menuOpen} />

                        <FloatingButton
                            icon="pencil-alt"
                            label={"Write Review"}
                            menuOpen={this.props.menuOpen}
                            action={() => this.setState({ mode: CoursesMode.WRITEREVIEW },
                                this.props.toggleModalOpen)} />

                    </>
                );
            case CoursesMode.WRITEREVIEW:
                return (
                    <ReviewForm mode={this.state.mode}
                        courseData={null}
                        setMode={this.setMode}
                        toggleModalOpen={this.props.toggleModalOpen} />
                );
            default: return (null);
        }
    }
}

export default ReviewPage;