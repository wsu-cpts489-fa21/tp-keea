import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import CoursesMode  from './CoursesMode.js';


class ReviewForm extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.mode === CoursesMode.WRITEREVIEW) {
            this.state = {
			comments: "", 
                        friendliness: "1",
                        golfChallenge: "1",
                        runningChallenge: "1",
                        experience: "1",
                        btnIcon: "pencil",
                        btnLabel: "Write Review"};
        } else { 
            this.state = this.props.courseData;
            this.state.btnIcon = "edit";
            this.state.btnLabel = "Update Course";
        }
    }

    computeSGS = (strokes, min, sec) => {
        return (Number(strokes) + Number(min)) 
                    + ":" + sec;
        }  
     
    handleChange = (event) => {
        const name = event.target.name;
        if (name === "seconds") {
            const newSec = (event.target.value.length < 2 ? "0" + 
            event.target.value : event.target.value);
            const newSGS = this.computeSGS(this.state.strokes, this.state.minutes, 
                                        newSec);
            this.setState({seconds: newSec, SGS: newSGS});
        } else if (name === "strokes") {
            const newStrokes = event.target.value;
            const newSGS = this.computeSGS(newStrokes, this.state.minutes, 
            this.state.seconds);
            this.setState({strokes: newStrokes, SGS: newSGS});
        } else if (name === "minutes") {
            const newMin = event.target.value;
            const newSGS = this.computeSGS(this.state.strokes, newMin, 
                this.state.seconds);
            this.setState({minutes: newMin, SGS: newSGS});
        } else {
            this.setState({[name]: event.target.value});
        }
    }
  
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({btnIcon: "spinner", btnLabel: "Saving..."},this.handleSubmitCallback);
    }

    handleSubmitCallback = async() => {
        const newCourse = {...this.state};
        delete newCourse.btnIcon;
        delete newCourse.btnLabel;
        const res = await this.props.saveCourse(newCourse);
        this.props.toggleModalOpen();
        this.props.setMode(CoursesMode.COURSESTABLE);
    }
    
    render() {
        return (
          <div id="coursesModeDialog" 
                className="mode-page action-dialog" role="dialog" 
                aria-modal="true" aria-labelledby="courseFormHeader" tabIndex="0">
            <h1 id="courseFormHeader" className="mode-page-header">
                {this.props.mode==CoursesMode.WRITEREVIEW ? "Log Course" : "Edit Course"}
            </h1>
            <form id="logCourseForm" 
                  onSubmit={this.handleSubmit} noValidate>


              <div className="mb-3 centered">
                <label htmlFor="courseComments">Comments:
                  <textarea name="comments" id="courseComments" className="form-control centered" 
                    aria-describedby="courseCommentsDescr"
                    rows="6" cols="75" maxLength="500"
                    value={this.state.comments} onChange={this.handleChange}>
                  </textarea>
                </label>
                <div id="courseCommentsDescr" className="form-text">
                  Enter optional course comments of up to 500 characters
                </div>
              </div>


              <div className="mb-3 centered">
                <label htmlFor="courseFriendliness">Friendliness:
                  <select id="courseFriendliness" name="friendliness" 
                    className="form-control centered" value={this.state.friendliness} onChange={this.handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select> 
                </label>
              </div>


              <div className="mb-3 centered">
                <label htmlFor="courseGolfChallenge">Golf Challenge:
                  <select id="courseGolfChallenge" name="golf challenge" 
                    className="form-control centered" value={this.state.golfChallenge} onChange={this.handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select> 
                </label>
              </div>


              <div className="mb-3 centered">
                <label htmlFor="courseRunningChallenge">Running Challenge:
                  <select id="courseRunningChallenge" name="running challenge" 
                    className="form-control centered" value={this.state.runningChallenge} onChange={this.handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select> 
                </label>
              </div>


              <div className="mb-3 centered">
                <label htmlFor="courseExperience">Experience:
                  <select id="courseExperience" name="experience" 
                    className="form-control centered" value={this.state.experience} onChange={this.handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select> 
                </label>
              </div>


              <div className="mode-page-btn-container">
                <button type="submit" className="mode-page-btn action-dialog action-button">
                    <FontAwesomeIcon icon={this.state.btnIcon}  className={this.state.btnIcon == "spinner" ? "fa-spin" : ""}/>
                    <span>&nbsp;{this.state.btnLabel}</span>
                </button>
                <button type="button" 
                        className="mode-page-btn-cancel action-dialog cancel-button"
                        onClick={() => {this.props.setMode(CoursesMode.CoursesTABLE);
                                        this.props.toggleModalOpen();}}>
                  <FontAwesomeIcon icon="window-close"/>
                  <span>&nbsp;Cancel</span>
                </button>
            </div>
          </form>
        </div>
      );
    }
}

export default CourseForm;